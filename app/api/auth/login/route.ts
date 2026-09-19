import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { customerAccessTokenCreateMutation } from '@/lib/shopify/mutations';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const res = await shopifyFetch<unknown>({
      query: customerAccessTokenCreateMutation,
      variables: { input: { email, password } },
      cache: 'no-store',
    });

    const tokenData = res.body.data?.customerAccessTokenCreate?.customerAccessToken;
    const errors = res.body.data?.customerAccessTokenCreate?.customerUserErrors;

    if (errors?.length || !tokenData) {
      return NextResponse.json(
        { error: errors?.[0]?.message || 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('customerToken', tokenData.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(tokenData.expiresAt),
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('[login]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
