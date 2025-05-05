import { resend } from "../config/resend";

export async function sendRegistrationEmail(email: string) {
  return await resend.emails.send({
    from: "cosmereview@resend.dev",
    to: email,
    subject: "Welcome to Cosmereview",
    html: "<p>Hola guapa, welcome to cosmereview</p>",
  });
}
