import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import axios from "axios";
import PaymentButton from "../components/PaymentButton";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalAmount } = useCart();

  const [cart, setCart] = React.useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/`, {
          withCredentials: true,
        });
        setCart(response.data.items);
        // console.log("FULL RESPONSE:", response.data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (foodItemId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/remove`,
        {
          foodItemId,
        },
        {
          withCredentials: true,
        },
      );
      setCart((prevCart) =>
        prevCart.filter((item) => item.foodItemId._id !== foodItemId),
      );
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/clear`,
        {},
        {
          withCredentials: true,
        },
      );
      setCart([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const handleIncreaseQuantity = async (foodItemId, currentQuantity) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          foodItemId,
          quantity: 1,
          partnerName: cart.find((item) => item.foodItemId._id === foodItemId)
            ?.partnerName,
        },
        {
          withCredentials: true,
        },
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.foodItemId._id === foodItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const handleDecreaseQuantity = async (foodItemId, currentQuantity) => {
    if (currentQuantity <= 1) {
      handleRemoveFromCart(foodItemId);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/decrease`,
        {
          foodItemId,
        },
        {
          withCredentials: true,
        },
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.foodItemId._id === foodItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

 const handleCheckout = async () => {
  try {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // ✅ Step 1: Call backend (create order + razorpay order)
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/payment/checkout`,
      {
        orderedItems: cart.map((item) => ({
          menuId: item.foodItemId._id,
          quantity: item.quantity,
        })),
      },
      { withCredentials: true }
    );

    // ✅ Step 2: Open Razorpay
    const options = {
      key: "rzp_test_SgtnVYCIoKZSHC", // frontend key
      amount: data.amount,
      currency: data.currency,
      name: "Mughlai Feast",
      description: "Order Payment",
      order_id: data.razorpayOrderId,

      handler: async function (response) {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/payment/verify`,
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }
          );

          alert("Payment Successful 🎉");
          handleClearCart();
        } catch (err) {
          alert("Payment verification failed ❌");
        }
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#ea580c",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Checkout failed ❌");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-600">
              Cart
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your order basket
            </h1>
          </div>
          <Link
            to="/reels"
            className="inline-flex items-center justify-center rounded-full bg-orange-600 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-orange-700 transition-colors"
          >
            Browse Reels
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm border border-gray-200">
            <p className="text-xl font-semibold text-gray-900 mb-4">
              Your cart is empty.
            </p>
            <p className="text-gray-600 mb-6">
              Add a delicious item from a partner reel or menu to begin
              ordering.
            </p>
            <Link
              to="/reels"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors"
            >
              Explore Reels
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="grid gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {item.foodItemId.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.partnerName}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(
                              item.foodItemId._id,
                              item.quantity,
                            )
                          }
                          className="w-8 h-8 rounded-full border border-orange-300 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors flex items-center justify-center font-semibold"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-gray-700 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(
                              item.foodItemId._id,
                              item.quantity,
                            )
                          }
                          className="w-8 h-8 rounded-full border border-orange-300 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors flex items-center justify-center font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-gray-900">
                        {item.foodItemId.currency}{" "}
                        {(item.foodItemId.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() =>
                          handleRemoveFromCart(item.foodItemId._id)
                        }
                        className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                  Order total
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {cart
                    .reduce(
                      (total, item) =>
                        total + item.quantity * item.foodItemId.price,
                      0,
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleClearCart}
                  className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Clear Cart
                </button>

              <PaymentButton handleCheckout={handleCheckout} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
