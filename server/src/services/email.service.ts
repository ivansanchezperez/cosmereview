import { resend } from "../config/resend";

export async function sendRegistrationEmail(email: string) {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "pau.garcia.valero@gmail.com",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
}
