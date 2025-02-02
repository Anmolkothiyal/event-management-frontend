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
import {
  Loader2,
  AlertCircle,
  LogOut,
  User,
  X,
  Ticket,
  Calendar,
  Tag,
  DollarSign,
  MapPin,
  Clock,
  Download
} from "lucide-react";
import axios from "@/services/axios";
import UseAuthHook from "@/hooks/useAuthHook";
import { motion } from "framer-motion";
import Footer from "@/component/core/Footer";

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

const ProfileDrawer = ({
  isOpen,
  onClose,
  userProfile,
  bookedTickets,
  onLogout,
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupedTickets = bookedTickets.reduce((acc, ticket) => {
    const key = `${ticket.eventId}-${ticket.category}`;
    if (!acc[key]) {
      acc[key] = {
        id: ticket.eventId,
        eventName: ticket.event.name,
        eventDate: ticket.event.date,
        category: ticket.category,
        price: ticket.price,
        status: ticket.status,
        quantity: 1,
        location: ticket.event.location,
        startTime: ticket.event.start_time,
        endTime: ticket.event.end_time,
        bookingId: ticket.id
      };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});

  const handleDownloadTicket = (ticket) => {
    const ticketInfo = `
=== EVENT TICKET ===

Booking ID: ${ticket.bookingId}
Event: ${ticket.eventName}
Date: ${formatDate(ticket.eventDate)}
Time: ${formatTime(ticket.startTime)} - ${formatTime(ticket.endTime)}
Location: ${ticket.location}
Category: ${ticket.category}
Quantity: ${ticket.quantity}
Price per ticket: $${ticket.price}
Total Amount: $${ticket.price * ticket.quantity}
Status: ${ticket.status}

Ticket Holder: ${userProfile.user.name}
Email: ${userProfile.user.email}

Generated on: ${new Date().toLocaleString()}

This ticket serves as proof of purchase.
Please present this ticket at the venue.
Thank you for your purchase!
    `.trim();

    const blob = new Blob([ticketInfo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ticket-${ticket.bookingId}-${ticket.eventName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!userProfile) {
    return (
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin" size={32} />
        </div>
      </div>
    );
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Profile</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} stroke="white" />
            </button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {userProfile.user.name}
                </h3>
                <p className="text-slate-400">{userProfile.user.email}</p>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full mt-2 inline-block">
                  {userProfile.user.role}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-sm text-slate-400">Member Since</p>
                <p className="text-white font-medium">
                  {formatDate(userProfile.user.created_at)}
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-sm text-slate-400">Account Status</p>
                <p className="text-white font-medium">
                  {userProfile.user.isVerified ? "Verified" : "Unverified"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold text-sky-500 mb-4 flex items-center sticky top-0 bg-slate-900 py-2">
              <Ticket className="mr-2" stroke="white" />
              Booked Tickets
            </h3>
            <div className="space-y-4">
              {Object.values(groupedTickets).length > 0 ? (
                Object.values(groupedTickets).map((ticket) => (
                  <div
                    key={`${ticket.id}-${ticket.category}`}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-slate-700/50 transition-colors border border-slate-700/50"
                  >
                    <h4 className="text-blue-400 font-semibold text-lg">
                      {ticket.eventName}
                    </h4>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center text-sm text-slate-300">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400"  stroke="white"/>
                        {formatDate(ticket.eventDate)}
                      </div>
                      <div className="flex items-center text-sm text-slate-300">
                        <Clock className="w-4 h-4 mr-2 text-slate-400"  stroke="white" />
                        {formatTime(ticket.startTime)} - {formatTime(ticket.endTime)}
                      </div>
                      <div className="flex items-center text-sm text-slate-300">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400"  stroke="white"/>
                        {ticket.location}
                      </div>
                      <div className="flex items-center text-sm text-slate-300">
                        <Tag className="w-4 h-4 mr-2 text-slate-400"  stroke="white" />
                        Category: {ticket.category}
                      </div>
                      <div className="flex items-center text-sm text-slate-300">
                        <DollarSign className="w-4 h-4 mr-2 text-slate-400" stroke="white" />
                        Price: ${ticket.price} × {ticket.quantity} tickets
                      </div>
                      <div className="flex items-center text-sm text-slate-300">
                        <Ticket className="w-4 h-4 mr-2 text-slate-400" stroke="white"/>
                        Total Amount: ${ticket.price * ticket.quantity}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span
                        className={`px-2 py-1 ${
                          ticket.status === "booked"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        } text-sm rounded-full`}
                      >
                        {ticket.status.charAt(0).toUpperCase() +
                          ticket.status.slice(1)}
                      </span>
                      <button
                        onClick={() => handleDownloadTicket(ticket)}
                        className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center space-x-2"
                      >
                        <Download size={16} stroke="white"/>
                        <span className="text-sky-500">Download</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Ticket className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                  <p className="text-slate-400">No tickets booked yet</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Your booked tickets will appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onLogout}
            className="mt-6 w-full bg-red-600/20 text-red-400 border border-red-500/30 py-3 px-4 rounded-xl hover:bg-red-500/30 transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut size={20} stroke="white" />
            <span className="text-white">Logout</span>
          </button>
        </div>
      </div>
    </>
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
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm text-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group flex flex-col">
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
          className="text-4xl font-extrabold text-blue-400"
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
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
              <span className="text-blue-400">{value}</span>
            </p>
          ))}
        </div>
        <div className="space-y-4">
          {eventTickets.map((ticket) => (
            <div key={ticket.category} className="flex items-center space-x-4">
              <div className="flex-grow">
                <p className="text-white">
                  {ticket.category} - ₹{ticket.price}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleTicketSelection(
                      ticket.category,
                      Math.max(0, (selectedTickets[ticket.category] || 0) - 1)
                    )
                  }
                  className="bg-slate-700 text-white px-2 py-1 rounded hover:bg-slate-600 transition-colors"
                >
                  -
                </button>
                <span className="text-white min-w-[20px] text-center">
                  {selectedTickets[ticket.category] || 0}
                </span>
                <button
                  onClick={() =>
                    handleTicketSelection(
                      ticket.category,
                      (selectedTickets[ticket.category] || 0) + 1
                    )
                  }
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition-colors"
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
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out font-semibold transform hover:-translate-y-1 hover:shadow-lg"
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [bookedTickets, setBookedTickets] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchTickets();
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const profileResponse = await axios.get(
        "https://event-mangement-backend-sj7x.onrender.com/api/profile"
      );
      setUserProfile(profileResponse.data);
      const ticketsResponse = await axios.get(
        "https://event-mangement-backend-sj7x.onrender.com/api/userticket"
      );

      if (ticketsResponse.data && ticketsResponse.data.tickets) {
        setBookedTickets(ticketsResponse.data.tickets);
      } else {
        console.error("Invalid tickets data format:", ticketsResponse.data);
        setBookedTickets([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };
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

  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    await fetchUserData();
  };

  const onLogout = async () => {
    await handleLogout();
    setIsProfileOpen(false);
  };

  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundImage: 'url("/img/bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="relative">
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Event Ticket Booking
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" stroke="white" />
                <span className="text-sky-500">Profile</span>
              </button>
            </div>
          </div>
        </header>

        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          userProfile={userProfile}
          bookedTickets={bookedTickets}
          onLogout={onLogout}
        />

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
                    onSuccess={handlePaymentSuccess}
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
      {/* <Footer /> */}
    </div>
  );
};

export default TicketBooking;
