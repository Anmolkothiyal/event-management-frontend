"use client";

import UseAuthHook from "@/hooks/useAuthHook"
import { KeyRound   } from 'lucide-react'
const ResetPassword = () => {
  const {
    authResetPasswordState,
    resetPasswordChangeHandler,
    resetPasswordSubmitHandler,
  } = UseAuthHook()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20">
      <div className="w-full max-w-md transform transition-all">
        <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 p-8">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-primary p-3 shadow-lg">
              <KeyRound className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Reset Password</h2>
            <p className="text-center text-muted-foreground mb-6">Enter your details to reset your password</p>
          </div>
          <form onSubmit={resetPasswordSubmitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={authResetPasswordState.email}
                onChange={resetPasswordChangeHandler}
                className="w-full px-4 py-3 rounded-lg bg-background border border-black border-input hover:border-ring focus:outline-none focus:ring-0 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={authResetPasswordState.newPassword}
                onChange={resetPasswordChangeHandler}
                className="w-full px-4 py-3 rounded-lg bg-background border border-black border-input hover:border-ring focus:outline-none focus:ring-0 transition-colors"
                placeholder="Enter your new password"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={authResetPasswordState.confirmPassword}
                onChange={resetPasswordChangeHandler}
                className="w-full px-4 py-3 rounded-lg bg-background border border-black border-input hover:border-ring focus:outline-none focus:ring-0 transition-colors"
                placeholder="Confirm your new password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none transition-colors font-medium"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword
