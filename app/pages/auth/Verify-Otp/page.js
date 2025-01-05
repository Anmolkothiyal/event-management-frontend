"use client"

import UseAuthHook from "@/hooks/useAuthHook"
import { Verified  } from 'lucide-react'

const VerifyOTP = () => {
  const {
    verifyOtpChangeHandler,
    VerifyOtpSubmitHandler,
    authVerifyOtpState,
  } = UseAuthHook();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20">
      <div className="w-full max-w-md transform transition-all">
        <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-8">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-primary p-3 shadow-lg">
              <Verified className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Verify OTP</h2>
            <p className="text-center text-muted-foreground mb-6">Please enter your OTP to verify</p>
          </div>
          <form onSubmit={VerifyOtpSubmitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={authVerifyOtpState.email}
                onChange={verifyOtpChangeHandler}
                className="w-full px-4 py-3 rounded-lg bg-background border border-black border-input hover:border-ring focus:outline-none focus:ring-0 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="otp">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={authVerifyOtpState.otp}
                onChange={verifyOtpChangeHandler}
                className="w-full px-4 py-3 rounded-lg bg-background border border-black border-input hover:border-ring focus:outline-none focus:ring-0 transition-colors"
                placeholder="Enter OTP"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none transition-colors font-medium"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP
