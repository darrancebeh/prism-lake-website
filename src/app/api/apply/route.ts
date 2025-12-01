import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { put } from "@vercel/blob";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const university = formData.get("university") as string;
    const course = formData.get("course") as string;
    const year = formData.get("year") as string;
    const transport = formData.get("transport") as string;
    const club = formData.get("club") as string;
    const role = formData.get("role") as string;
    const linkedin = formData.get("linkedin") as string;
    const portfolio = formData.get("portfolio") as string;
    const essay = formData.get("essay") as string;
    const resumeFile = formData.get("resume") as File;

    // 1. Upload Resume to Vercel Blob
    const resumeBlob = await put(resumeFile.name, resumeFile, {
      access: "public",
      addRandomSuffix: true,
    });

    // 2. Append to Google Sheets
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:N",
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          phone,
          university,
          course,
          year,
          transport,
          club,
          role,
          linkedin,
          portfolio,
          essay,
          resumeBlob.url,
        ]],
      },
    });

    // 3. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `
      <h2>New Application Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>University:</strong> ${university} (${course}, Year ${year})</p>
      <p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>
      <p><strong>Resume:</strong> <a href="${resumeBlob.url}">View Resume</a></p>
      <hr>
      <p><strong>Essay:</strong></p>
      <p>${essay}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Application: ${name} - ${role}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}