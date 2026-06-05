import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contactSchema";

/**
 * Contact Form API Route
 * Handles contact form submissions
 *
 * POST /api/contact
 * Body: { nome, email, mensagem, consentimento }
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate form data
    const validatedData = contactSchema.parse(body);

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, we'll log the data and return success
    console.log("📧 Contact Form Submission:", {
      nome: validatedData.nome,
      email: validatedData.email,
      mensagem: validatedData.mensagem,
      consentimento: validatedData.consentimento,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email notification
    // Example with Resend:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'YourSelf Pilates <noreply@yourselfpilates.pt>',
      to: 'yourselfpilates@gmail.com',
      subject: `Nova mensagem de contacto - ${validatedData.nome}`,
      html: `
        <h2>Nova mensagem de contacto</h2>
        <p><strong>Nome:</strong> ${validatedData.nome}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${validatedData.mensagem || 'Sem mensagem'}</p>
        <p><strong>Consentimento:</strong> ${validatedData.consentimento ? 'Sim' : 'Não'}</p>
        <p><small>Recebido em: ${new Date().toLocaleString('pt-PT')}</small></p>
      `,
    });
    */

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso!",
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao enviar mensagem. Por favor, tente novamente.",
      },
      { status: 500 }
    );
  }
}
