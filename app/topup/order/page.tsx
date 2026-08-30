import { Suspense } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TopupOrderClient from '../../../components/TopupOrderClient';

export default function TopupOrder() {
  return (
    <>
      <Header />
      <main className="wrap topupOrderPage">
        <Suspense fallback={<div className="wrap" style={{ padding: '60px 0', textAlign: 'center' }}>Loading Game Order...</div>}>
          <TopupOrderClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
