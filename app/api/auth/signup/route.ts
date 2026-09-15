import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import {
  customerCreateMutation,
  customerAccessTokenCreateMutation,
} from '@/lib/shopify/mutations';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    // 1. Create the customer account
    const createRes = await shopifyFetch<any>({
      query: customerCreateMutation,
      variables: { input: { firstName, lastName, email, password } },
      cache: 'no-store',
    });

    const createErrors = createRes.body.data?.customerCreate?.customerUserErrors;
    if (createErrors?.length) {
      return NextResponse.json({ error: createErrors[0].message }, { status: 400 });
    }

    // 2. Auto-login after signup
    const loginRes = await shopifyFetch<any>({
      query: customerAccessTokenCreateMutation,
      variables: { input: { email, password } },
      cache: 'no-store',
    });

    const tokenData = loginRes.body.data?.customerAccessTokenCreate?.customerAccessToken;
    const loginErrors = loginRes.body.data?.customerAccessTokenCreate?.customerUserErrors;

    if (loginErrors?.length || !tokenData) {
      // Account created but couldn't auto-login — just return success
      return NextResponse.json({ success: true, autoLogin: false });
    }

    const response = NextResponse.json({ success: true, autoLogin: true });
    response.cookies.set('customerToken', tokenData.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(tokenData.expiresAt),
      path: '/',
    });

    return response;
  } catch (err: any) {
    console.error('[signup]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
