import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { put } from "@vercel/blob";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // 1. Extract Data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const linkedin = formData.get("linkedin") as string;
    const portfolio = formData.get("portfolio") as string;
    const why = formData.get("why") as string;
    const resumeFile = formData.get("resume") as File;

    if (!resumeFile) {
      return NextResponse.json({ error: "No resume uploaded" }, { status: 400 });
    }

    // 2. Upload Resume to Vercel Blob (Cloud Storage)
    // We rename it to include the user's name for easier organization
    const filename = `${role}-${name.replace(/\s+/g, "_")}-resume.pdf`;
    const blob = await put(filename, resumeFile, {
      access: "public",
    });

    // 3. Authenticate with Google Sheets
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"), // Fix newline escape issues
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
    await doc.loadInfo();

    // Get the first sheet
    const sheet = doc.sheetsByIndex[0];

    // Ensure headers exist (Optional, but good for first run)
    await sheet.setHeaderRow([
      "Date", "Name", "Email", "Role", "LinkedIn", "Portfolio", "Why Prism?", "Resume URL", "Status"
    ]);

    // 4. Append the Row
    await sheet.addRow({
      Date: new Date().toISOString(),
      Name: name,
      Email: email,
      Role: role,
      LinkedIn: linkedin,
      Portfolio: portfolio,
      "Why Prism?": why,
      "Resume URL": blob.url,
      Status: "Pending Review"
    });

    // 5. Send Notification Email (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Prism Lake System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `[APPLY] New Candidate: ${name} (${role})`,
      html: `
        <h3>New Application Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>
        <p><strong>Resume:</strong> <a href="${blob.url}">Download PDF</a></p>
        <hr />
        <p><strong>Why Prism?</strong><br/>${why}</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Application Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}