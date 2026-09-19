import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { customerAccessTokenDeleteMutation } from '@/lib/shopify/mutations';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('customerToken')?.value;

    if (token) {
      // Invalidate token on Shopify side
      await shopifyFetch<unknown>({
        query: customerAccessTokenDeleteMutation,
        variables: { customerAccessToken: token },
        cache: 'no-store',
      }).catch(() => {}); // Don't fail if Shopify call fails
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete('customerToken');
    return response;
  } catch (err) {
    console.error('[logout]', err);
    const response = NextResponse.json({ success: true });
    response.cookies.delete('customerToken');
    return response;
  }
}
