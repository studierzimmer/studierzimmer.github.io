import { Resend } from 'resend';


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(text: string) {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    console.log("[CORS] Preflight request received");
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    return new Response(
      JSON.stringify({ error: "Email service is not configured." }),
      {
        status: 503,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    const { name, email, subject, message }: ContactFormData = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("📨 Sending contact email:", { name, email, subject });

    const response = await resend.emails.send({
      from: Deno.env.get("CONTACT_FROM_EMAIL") ?? "Studierzimmer <onboarding@resend.dev>",
      to: [Deno.env.get("CONTACT_TO_EMAIL") ?? "tostudierzimmer@gmail.com"],
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
          ${escapeHtml(message).replace(/\n/g, "<br>")}
        </div>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from your website contact form.
        </p>
      `,
    });

    console.log("✅ Email sent:", response);

    if (response.error) {
      console.error("❌ Resend API error:", response.error);
      return new Response(
        JSON.stringify({ error: response.error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: response.data?.id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: unknown) {
    console.error("❌ Function error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
}
