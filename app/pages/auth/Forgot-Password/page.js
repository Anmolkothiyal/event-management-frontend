"use client"

import UseAuthHook from "@/hooks/useAuthHook"
import { Send  } from 'lucide-react'
const ForgotPassword = () => {
  const{
   forgotPasswordChangeHandler,
   ForgotPasswordSubmitHandler,
   authForgotPasswordState,
  }=UseAuthHook()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20">
      <div className="w-full max-w-md transform transition-all">
        <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-8">
          <div className="mt-4">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-primary p-3 shadow-lg">
              <Send className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Forgot Password</h2>
            <p className="text-center text-muted-foreground mb-6">Please enter your email to receive an OTP</p>
          </div>
          <form onSubmit={ForgotPasswordSubmitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={authForgotPasswordState.email}
                onChange={forgotPasswordChangeHandler}
                className="w-full px-4 py-3 rounded-lg bg-background border border-black border-input hover:border-ring focus:outline-none focus:ring-0 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none transition-colors font-medium"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword
