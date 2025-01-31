"use client";
import React, { useEffect, useState } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentConfirmation = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const clientSecretParam = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    setClientSecret(clientSecretParam || "");
  }, []);

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentStatusInner />
    </Elements>
  );
};

const PaymentStatusInner = () => {
  const stripe = useStripe();
  const [paymentStatus, setPaymentStatus] = useState({
    status: "processing",
    message: "Confirming your payment...",
  });

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      setPaymentStatus({
        status: "error",
        message: "No payment information found.",
      });
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setPaymentStatus({
            status: "success",
            message: "Payment successful! Your tickets have been booked.",
          });
          break;
        case "processing":
          setPaymentStatus({
            status: "processing",
            message: "Payment is still processing...",
          });
          break;
        case "requires_payment_method":
          setPaymentStatus({
            status: "error",
            message: "Payment failed. Please try another payment method.",
          });
          break;
        default:
          setPaymentStatus({
            status: "error",
            message: "Something went wrong with the payment.",
          });
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        {paymentStatus.status === "processing" && (
          <Loader2 className="animate-spin text-blue-600 mx-auto" size={48} />
        )}
        {paymentStatus.status === "success" && (
          <CheckCircle2 className="text-green-600 mx-auto" size={48} />
        )}
        {paymentStatus.status === "error" && (
          <XCircle className="text-red-600 mx-auto" size={48} />
        )}
        <h2 className="text-center text-xl font-semibold mt-4">
          {paymentStatus.message}
        </h2>
        <div className="text-center mt-4">
          <a href="/pages/dashboard" className="text-blue-600 hover:underline">
            Back to Events
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;