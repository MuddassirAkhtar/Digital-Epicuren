import React from "react";

function PaymentButton({ handleCheckout }) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-full bg-orange-600 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-orange-700 transition-colors"
      onClick={handleCheckout}
    >
      Pay Now
    </button>
  );
}

export default PaymentButton;