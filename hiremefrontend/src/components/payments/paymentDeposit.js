import React, { useEffect, useState } from "react";
import Nav from "../nav";
import OtherNav from "../otherNav";
import Footer from "../footer";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import authConfig from "../../api/config";
import { toast } from "react-toastify";

const PaymentDeposit = () => {
  const [openModalForDeposit, setOpenModalForDeposit] = useState(false);
  const [deposit, setDeposit] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay"); 
  const authId = JSON.parse(localStorage.getItem("authId"));

  const handleOpenModal = () => {
    setOpenModalForDeposit(true);
  };
  
  const handleCloseModal = () => {
    setOpenModalForDeposit(false);
  };
  

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleStripePayment = async () => {
    if (!deposit || Number(deposit) <= 0) {
      toast.warning("Please enter a valid amount.");
      return;
    }
  
    try {
      const response = await authConfig.put(`/addtocardStripe/${authId}`, {
        amountUSD: deposit,
      });
  
      const data = response.data;
  
      if (data.success && data.checkoutUrl) {
        // Redirect user to Stripe checkout
        window.location.href = data.checkoutUrl;
      } else {
        toast.error("Failed to create Stripe session.");
      }
    } catch (error) {
      console.error("Stripe error:", error);
      toast.error("Stripe payment failed!");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
  
    if (sessionId) {
      authConfig.get(`/verifyStripe/${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            toast.success("Wallet funded successfully!");
            
          } else {
            toast.error(res.data.message || "Payment failed!");
          }
        })
        .catch((err) => {
          console.error("Verification error:", err);
          toast.error("Something went wrong during verification.");
        });
    }
  }, []);
  
  
  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    try {
      const { data } = await authConfig.put(`/addtocard/${authId}`, {
        amountUSD: deposit,
        userId: authId,
      });

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "MetaLance",
        description: "Wallet Deposit",
        order_id: data.order_id,
        handler: async function (response) {
          try {
            const verifyResponse = await authConfig.put(`/verify/${authId}`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amountUSD: deposit,
            });

            if (verifyResponse.data.success) {
              toast.success("Payment successful and verified!");
              setDeposit("");
              handleCloseModal();
            } else {
              alert("Payment failed verification.");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Verification error!");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "User Address",
        },
        theme: {
          color: "#f78318",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to create payment order.");
    }
  };

  const handlePayment = () => {
    if (!deposit || Number(deposit) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
    } else {
      handleStripePayment();
    }
  };

  return (
    <div>
      <div className="bg-[#eef2f8] pb-10 min-h-screen">
        <Nav />
        <OtherNav />
        <div className="w-[90%] md:w-[80%] m-auto bg-white text-start rounded-md p-6 mt-10 shadow-md">
            <h1 className="border-b border-b-neutral-200 pb-3 text-[1.5rem] text-[#495463] font-bold">
                Deposit Funds
            </h1>
            <div className="flex gap-5 items-center mt-5 flex-wrap">
                <button
                    className="bg-[#f78318] rounded-md px-4 py-2 text-white font-semibold hover:bg-[#e27000]"
                    onClick={handleOpenModal}
                >
                    + Add Amount
                </button>
                <h1 className="font-semibold text-gray-700">
                    Transfer amount to your wallet
                </h1>
            </div>
      </div>
      </div>


      {/* Deposit Modal */}
      <Dialog
        open={openModalForDeposit}
        onClose={handleCloseModal}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all p-6">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Confirm Your Deposit
              </DialogTitle>

              <div className="mt-4">
                <label className="font-medium text-gray-700">Amount In $</label>
                <input
                  type="number"
                  placeholder="Enter deposit amount $"
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f78318]"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="font-medium text-gray-700">
                  Choose Payment Gateway
                </label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                    />
                    Razorpay
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                    />
                    Stripe
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="px-5 py-2 rounded-md bg-[#f78318] text-white hover:bg-[#e27000]"
                >
                  Deposit
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PaymentDeposit;
