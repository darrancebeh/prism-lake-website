// ... existing imports ...

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // 1. Extract ALL new fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string; // NEW
    const university = formData.get("university") as string; // NEW
    const course = formData.get("course") as string; // NEW
    const year = formData.get("year") as string; // NEW
    const transport = formData.get("transport") as string; // NEW
    const club = formData.get("club") as string; // NEW
    
    const role = formData.get("role") as string;
    const linkedin = formData.get("linkedin") as string;
    const portfolio = formData.get("portfolio") as string;
    const essay = formData.get("essay") as string; // Renamed from 'why'
    const resumeFile = formData.get("resume") as File;

    if (!resumeFile) return NextResponse.json({ error: "No resume" }, { status: 400 });

    // 2. Upload Resume (Same as before)
    const filename = `${role}-${name.replace(/\s+/g, "_")}-resume.pdf`;
    const blob = await put(filename, resumeFile, { access: "public" });

    // 3. Google Sheets Logic
    // ... auth logic same as before ...

    // IMPORTANT: Update your Google Sheet Header Row manually or use code
    // Columns: Date | Name | Email | Phone | Uni | Course | Year | Transport | Club | Role | LinkedIn | Portfolio | Essay | Resume | Status
    
    await sheet.addRow({
      Date: new Date().toISOString(),
      Name: name,
      Email: email,
      Phone: phone,
      University: university,
      Course: course,
      Year: year,
      Transport: transport,
      Club: club || "N/A",
      Role: role,
      LinkedIn: linkedin,
      Portfolio: portfolio,
      Essay: essay,
      "Resume URL": blob.url,
      Status: "Pending Review"
    });

    // 4. Send Email (Include new fields in the HTML)
    await transporter.sendMail({
      from: `"Prism Lake System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[APPLY] ${name} - ${role}`,
      html: `
        <h3>New Candidate: ${name}</h3>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>University:</strong> ${university} (${year})</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Transport:</strong> ${transport}</p>
        <p><strong>Club:</strong> ${club}</p>
        <hr />
        <p><strong>Essay Response:</strong><br/>${essay.replace(/\n/g, '<br/>')}</p>
        <hr />
        <p><a href="${blob.url}">Download Resume PDF</a></p>
        <p><a href="${linkedin}">LinkedIn Profile</a></p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}