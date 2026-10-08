import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const exactEmail = email.trim();

    // Secure server-side credential definitions loaded from environment variables (.env.local)
    const adminAccounts = [
      {
        email: process.env.ADMIN_EMAIL_1?.trim(),
        password: process.env.ADMIN_PASS_1,
      },
      {
        email: process.env.ADMIN_EMAIL_2?.trim(),
        password: process.env.ADMIN_PASS_2,
      },
    ].filter((acc): acc is { email: string; password: string } => Boolean(acc.email && acc.password));

    const matchedAccount = adminAccounts.find((acc) => acc.email === exactEmail);

    if (!matchedAccount) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Unauthorized administrator account or invalid credentials.",
        },
        { status: 401 }
      );
    }

    if (password !== matchedAccount.password) {
      return NextResponse.json(
        { success: false, error: "Invalid security password for this administrator." },
        { status: 401 }
      );
    }

    // Generate secure HMAC session token
    const token = crypto
      .createHmac("sha256", process.env.ADMIN_SESSION_SECRET || "m1_secret_2026")
      .update(`${exactEmail}:${Date.now()}`)
      .digest("hex");

    return NextResponse.json({
      success: true,
      email: exactEmail,
      token,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication service error." },
      { status: 500 }
    );
  }
}
