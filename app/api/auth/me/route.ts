import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { getCustomerQuery } from '@/lib/shopify/mutations';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('customerToken')?.value;

    if (!token) {
      return NextResponse.json({ customer: null }, { status: 401 });
    }

    const res = await shopifyFetch<any>({
      query: getCustomerQuery,
      variables: { customerAccessToken: token },
      cache: 'no-store',
    });

    const customer = res.body.data?.customer;
    if (!customer) {
      // Token expired or invalid — clear it
      const response = NextResponse.json({ customer: null }, { status: 401 });
      response.cookies.delete('customerToken');
      return response;
    }

    return NextResponse.json({ customer });
  } catch (err) {
    console.error('[me]', err);
    return NextResponse.json({ customer: null }, { status: 500 });
  }
}
