import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
      
      <div className="prose prose-lg text-gray-700 space-y-6">
        <p>Orders are processed within 3 days and delivered within 7-10 Business days, depending on your location.</p>
        
        <p>Shipping is [free above ₹999 / flat rate ₹999 / calculated at checkout].</p>
        
        <p>A tracking link is shared once your order is dispatched.</p>
        
        <p>Please record an unboxing video while opening your package — this is required if you need to raise a damage claim.</p>
        
        <p>If a package is returned to us as undeliverable, we'll contact you to arrange re-shipment or a refund, minus original shipping.</p>
      </div>
    </div>
  );
}
