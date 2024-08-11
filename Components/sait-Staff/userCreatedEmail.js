//email send when user will be created by sait-staff
// lib/email.js

export async function sendEmailAfterUserCreatedBySaitStaff(email, password) {
    const subject = "Welcome to Student Scoop!";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 10px;">
        <h1>Welcome to Student Scoop!</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/studentscoops-20914.appspot.com/o/SaitLogo%2FprofileImage%2Flogo.png?alt=media&token=7f995828-5c20-4f35-a757-3bc403c903f3" alt="Student-Scoop-Logo" style="width: 100px; height: 100px;">
        <p>Your account has been created by the SAIT staff.</p>
        <p style="font-weight: bold;">Your login credentials are:</p>
        <p style="font-weight: bold;">Password: ${password}</p>
        <p>You can now login to your account and start using our services.</p>
        <a href="http://localhost:3000" style="text-decoration: none; color: #007bff;">Login</a>
        <p>Thank you for choosing Student Scoop!</p>
      </div>
    `;
    console.log("email: ", email);
    console.log("subject: ", subject);
    console.log("htmlContent: ", htmlContent);
    console.log("password: ",password)
    console.log("process.env.EMAIL: ", process.env.NEXT_PUBLIC_EMAIL);
    console.log("process.env.EMAIL_PASSWORD: ", process.env.NEXT_PUBLIC_EMAIL_PASSWORD);
  
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, subject, htmlContent }),
    });
    const data = await res.json();
    console.log("data: ", data);
    return data;
  }