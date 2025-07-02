import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export async function sendResetEmail(email: string, token: string) {
  const resetLink = `${siteUrl}/password/validate?token=${token}`;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <h2>Password Reset</h2>
            <p>You requested to reset your password. Click the link below:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link will expire in 1 hour. If you didn't request this, you can ignore this email.</p>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Reset Your Password",
      },
    },
    Source: process.env.EMAIL_FROM!,
  };

  const command = new SendEmailCommand(params);

  try {
    await ses.send(command);
    console.log(`Reset email sent to ${email}`);
  } catch (err) {
    console.error("Failed to send email", err);
    throw new Error("Failed to send reset email");
  }
}
