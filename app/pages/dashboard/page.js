"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useEventHooks from "@/hooks/useEventHooks";
import useTicketHook from "@/hooks/useTicketHook";
import { Loader2, AlertCircle, LogOut } from "lucide-react";
import axios from "@/services/axios";
import UseAuthHook from "@/hooks/useAuthHook";
import { motion } from "framer-motion";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentForm = ({ clientSecret, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/pages/payment`,
        },
      });

      if (error) {
        onError(error.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      onError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6 bg-slate-800 p-6 rounded-lg"
    >
      <PaymentElement className="mb-6 text-white" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:opacity-90 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-lg font-semibold shadow-md"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin mr-3" size={24} />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

const EventCard = ({ event, tickets, onBook }) => {
  const [selectedTickets, setSelectedTickets] = useState({});
  const eventTickets =
    tickets?.events?.find((t) => t.eventDetails.id === event.id)
      ?.ticketCategories || [];

  const handleTicketSelection = (category, quantity) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [category]: quantity,
    }));
  };

  const handleBookTicket = () => {
    const selectedCategories = Object.entries(selectedTickets).filter(
      ([_, quantity]) => quantity > 0
    );

    if (selectedCategories.length === 0) {
      alert("Please select at least one ticket category");
      return;
    }

    selectedCategories.forEach(([category, quantity]) => {
      onBook(event, category, quantity);
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.name}
          className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 space-y-4 flex flex-col flex-grow">
        <motion.h1
          className="text-4xl font-extrabold text-blue-800"
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1, color: "#1E40AF" }} 
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            scale: 1.1,
            color: "#2563EB",
            textShadow: "0px 0px 10px rgba(37, 99, 235, 0.6)",
            transition: { duration: 0.3 },
          }}
        >
          {event.name}
        </motion.h1>
        <p className="text-slate-300 line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm">
          {[
            {
              label: "Date",
              value: new Date(event.date).toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            },
            {
              label: "Time",
              value: `${new Date(
                `1970-01-01T${event.start_time}`
              ).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata",
              })} - ${new Date(
                `1970-01-01T${event.end_time}`
              ).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata",
              })} IST`,
            },
            { label: "Location", value: event.location },
          ].map(({ label, value }) => (
            <p key={label} className="flex items-center">
              <span className="font-semibold mr-2 text-white">{label}:</span>
              <span className="text-blue-800">{value}</span>
            </p>
          ))}
        </div>

        <div className="space-y-4">
          {eventTickets.map((ticket) => (
            <div key={ticket.category} className="flex items-center space-x-">
              <div className="flex-grow ">
                <p className="text-white">
                  {ticket.category} - ₹{ticket.price}
                </p>
                {/* <p className="text-xs text-slate-400">
        Available: {ticket.availableTickets}
      </p> */}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleTicketSelection(
                      ticket.category,
                      Math.max(0, (selectedTickets[ticket.category] || 0) - 1)
                    )
                  }
                  className="bg-slate-700 text-white px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="text-white">
                  {selectedTickets[ticket.category] || 0}
                </span>
                <button
                  onClick={() =>
                    handleTicketSelection(
                      ticket.category,
                      (selectedTickets[ticket.category] || 0) + 1
                    )
                  }
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={handleBookTicket}
            disabled={Object.values(selectedTickets).every((qty) => qty === 0)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out font-semibold transform hover:-translate-y-1 hover:shadow-lg"
          >
            Book Selected Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

const TicketBooking = () => {
  const events = useSelector((state) => state.eventSlice?.events);
  const tickets = useSelector((state) => state.ticketSlice?.tickets);
  const { fetchEvents } = useEventHooks();
  const { fetchTickets } = useTicketHook();
  const { handleLogout } = UseAuthHook();
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchTickets();
  }, []);

  const handleBookTicket = async (event, category, quantity) => {
    if (!event || !category || quantity <= 0) {
      alert("Please select all required fields");
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    try {
      const response = await axios.post(
        "https://event-mangement-backend-sj7x.onrender.com/api/payment/create-intent",
        {
          eventName: event.name,
          category,
          quantity,
        }
      );

      if (response.data?.clientSecret) {
        setClientSecret(response.data.clientSecret);
        setShowPaymentModal(true);
      } else {
        throw new Error("No client secret received");
      }
    } catch (error) {
      console.error("Payment creation error:", error);
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? "Please log in to book tickets"
          : "Unable to connect to payment service");
      setPaymentError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white">
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Event Ticket Booking
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" stroke="blue" />
            <span className="text-white">Logout</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {paymentError && (
          <div className="flex items-center justify-center mb-8">
            <div className="bg-red-600/20 border border-red-500 text-red-300 p-4 rounded-lg flex items-center">
              <AlertCircle className="mr-3" />
              {paymentError}
            </div>
          </div>
        )}

        {showPaymentModal && clientSecret && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-xl p-8 w-full max-w-md shadow-2xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Complete Payment
              </h2>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm
                  clientSecret={clientSecret}
                  onSuccess={() => setShowPaymentModal(false)}
                  onError={(error) => setPaymentError(error)}
                />
              </Elements>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="mt-6 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                tickets={tickets}
                onBook={handleBookTicket}
              />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-slate-400 text-lg">
                No events available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketBooking;
