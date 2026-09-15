'use client';

import { usePathname } from 'next/navigation';
import { TopBar } from './TopBar';
import { Header } from './Header';
import { MobileFooterNav } from './MobileFooterNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppButton } from './WhatsAppButton';

const AUTH_PATHS = ['/account/login', '/account/signup', '/account/activate'];

export function SiteShell() {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.some((p) => pathname?.startsWith(p));

  if (isAuth) return null;

  return (
    <>
      <TopBar />
      <Header />
      <MobileFooterNav />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
}
