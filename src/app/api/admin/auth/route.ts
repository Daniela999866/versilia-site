// src/app/api/admin/auth/route.ts
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password richiesta' }, { status: 400 });
    }

    const adminKey = process.env.ADMIN_SECRET_KEY;
    if (!adminKey) {
      return NextResponse.json({ error: 'Admin non configurato' }, { status: 500 });
    }

    if (password !== adminKey) {
      // Small delay to prevent brute force
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json({ error: 'Password errata' }, { status: 401 });
    }

    // Generate a simple session token
    const token = createHash('sha256')
      .update(`${adminKey}:${Date.now()}:villa-admin`)
      .digest('hex');

    // In production, store this token in a server-side session/Redis
    // For simplicity we validate against the admin key on each request
    return NextResponse.json({
      token: adminKey, // We use the admin key itself as the bearer token
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Errore server' }, { status: 500 });
  }
}
