import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { customerActivateByUrlMutation } from '@/lib/shopify/mutations';

export async function POST(req: Request) {
  try {
    const { activationUrl, password } = await req.json();

    if (!activationUrl || !password) {
      return NextResponse.json(
        { error: 'Missing activation URL or password' },
        { status: 400 }
      );
    }

    const res = await shopifyFetch<any>({
      query: customerActivateByUrlMutation,
      variables: {
        activationUrl,
        password,
      },
      cache: 'no-store',
    });

    const activateData = res.body?.data?.customerActivateByUrl;

    if (activateData?.customerUserErrors?.length > 0) {
      return NextResponse.json(
        { error: activateData.customerUserErrors[0].message },
        { status: 400 }
      );
    }

    const token = activateData?.customerAccessToken?.accessToken;

    if (!token) {
      return NextResponse.json(
        { error: 'Failed to generate access token' },
        { status: 400 }
      );
    }

    // Set HTTP-only cookie for session
    const response = NextResponse.json(
      { success: true, customer: activateData.customer },
      { status: 200 }
    );
    
    response.cookies.set({
      name: 'customerToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error('Activation Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during activation' },
      { status: 500 }
    );
  }
}
