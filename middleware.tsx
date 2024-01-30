import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

// The getSession function must be called for any Server Component routes that use a Supabase client.
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
    const { data } = await supabase.auth.getSession();

  if (data?.session && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!data?.session && req.nextUrl.pathname.startsWith("/create-post")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}
