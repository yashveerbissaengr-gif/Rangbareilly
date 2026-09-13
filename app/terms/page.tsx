import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg text-gray-700 space-y-6">
        <p>
          Rangbareilly.in is operated by RANG BARELIY IMMITATION JEWELLERY, Swami Complex, Modi Number 2, Sitabuldi, Nagpur, 440012.
        </p>
        
        <ul className="list-disc pl-6 space-y-4">
          <li>By placing an order with us, you agree to these terms.</li>
          <li>All prices are listed in INR and include applicable taxes unless stated otherwise.</li>
          <li>Product colors may vary slightly from what you see on screen, due to lighting and display differences.</li>
          <li>Orders are confirmed only once payment is successfully received.</li>
          <li>All content on this site — photos, designs, and the Rangbareilly name/logo — belongs to us and may not be copied or reused without permission.</li>
          <li>These terms are governed by Indian law.</li>
          <li>Questions? Write to us at - <strong>rangbareillystore@gmail.com</strong>.</li>
        </ul>
      </div>
    </div>
  );
}
