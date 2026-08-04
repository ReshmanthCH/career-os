import nodemailer from "nodemailer";

/**
 * Send OTP to user's email address
 * Configured for Vercel Serverless Functions (supports Port 465 / SSL & Gmail service fallback)
 */
export const sendOTPEmail = async (email, otp) => {
  console.log("\n==================================================");
  console.log(`✉️  [EMAIL OTP SERVICE] Sending OTP to: ${email}`);
  console.log(`🔑  OTP CODE: [ ${otp} ]`);
  console.log("==================================================\n");

  try {
    const host = process.env.EMAIL_HOST;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const configuredPort = process.env.EMAIL_PORT;

    if (user && pass) {
      const isGmail = (host && host.includes("gmail")) || user.includes("@gmail.com");
      
      // On Vercel serverless functions, port 587 is blocked. Use Port 465 (SSL) or Gmail service.
      const transportConfig = isGmail
        ? {
            service: "gmail",
            auth: { user, pass },
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 8000,
          }
        : {
            host: host || "smtp.gmail.com",
            port: Number(configuredPort) || 465,
            secure: true, // SSL/TLS for Vercel
            auth: { user, pass },
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 8000,
            tls: {
              rejectUnauthorized: false,
            },
          };

      const transporter = nodemailer.createTransport(transportConfig);

      await transporter.sendMail({
        from: `"CareerOS Team" <${user}>`,
        to: email,
        subject: `${otp} is your CareerOS Email Verification Code`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #4f46e5; margin-bottom: 8px;">CareerOS Verification</h2>
            <p style="color: #475569; font-size: 14px;">Welcome to CareerOS! Use the 6-digit code below to verify your email address and complete registration:</p>
            <div style="background-color: #f1f5f9; padding: 16px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e1b4b;">${otp}</span>
            </div>
            <p style="color: #94a3b8; font-size: 12px;">This code will expire in 10 minutes. If you did not request this email, please ignore it.</p>
          </div>
        `,
      });

      console.log(`✅ Real Email successfully sent to ${email}`);
      return { sent: true };
    }

    return { sent: false, reason: "SMTP credentials not configured" };
  } catch (error) {
    console.error("⚠️ SMTP Notice (Vercel Serverless Catch):", error.message);
    return { sent: false, reason: error.message };
  }
};
