// utils/sendInviteEmail.ts
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export async function sendInviteEmail(email: string, token: string, role: string = "agrohub") {
  const inviteUrl = `${siteUrl}/invite/validate?token=${token}&role=${role}`;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <h1>You've been invited to join AgroHub</h1>
            <p>Click below to accept your invite:</p>
            <a href="${inviteUrl}">${inviteUrl}</a>
            <p>This link will expire in 1 hour.</p>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "You're Invited to Join AgroHub!",
      },
    },
    Source: process.env.EMAIL_FROM!,
  };

  await ses.send(new SendEmailCommand(params));
  console.log("Invite email sent to:", email);
}

