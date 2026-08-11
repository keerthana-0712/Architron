import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from "@clerk/nextjs/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "keerthana.salla.7@gmail.com";

async function verifyAdmin() {
  try {
    const user = await currentUser();
    if (!user) return false;
    const email = user.emailAddresses[0]?.emailAddress;
    return email === ADMIN_EMAIL;
  } catch (error) {
    console.error("verifyAdmin auth error:", error);
    return false;
  }
}

// Public: Submit new contact message
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Save to Database
    await db.contactMessage.create({
      data: { name, email, message }
    });

    // 2. Send Email Notification
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['keerthana.salla.7@gmail.com'],
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ 
        error: error.message || 'Failed to send email' 
      }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}

// Admin only: Toggle read/unread status
export async function PATCH(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id, isRead } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing message ID" }, { status: 400 });
    }

    const updated = await db.contactMessage.update({
      where: { id },
      data: { isRead: Boolean(isRead) }
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PATCH Contact error:", error);
    return NextResponse.json({ error: error.message || "Failed to update status" }, { status: 500 });
  }
}

// Admin only: Delete message
export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing message ID" }, { status: 400 });
    }

    await db.contactMessage.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Contact error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete message" }, { status: 500 });
  }
}
