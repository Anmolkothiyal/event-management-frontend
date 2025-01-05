"use client"

import UseAuthHook from "@/hooks/useAuthHook"
import PageRoutes from "@/utilis/PageRoute"
import { LockKeyhole, Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const {
    loginChangeHandler,
    LoginSubmitHandler,
    authLoginState,
    router,
    togglePasswordVisibility,
    showPassword,
  } = UseAuthHook()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20">
      <div className="w-full max-w-md transform transition-all">
        <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-8">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-primary p-3 shadow-lg">
              <LockKeyhole className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Welcome back</h2>
            <p className="text-center text-muted-foreground mb-6">Please enter your details to sign in</p>
          </div>
          <form onSubmit={LoginSubmitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={authLoginState.email}
                onChange={loginChangeHandler}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input hover:border-ring focus:outline-none border-black transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={authLoginState.password}
                  onChange={loginChangeHandler}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input hover:border-ring focus:outline-none border-black transition-colors pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none  transition-colors font-medium"
            >
              Sign in
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push(PageRoutes.FORGOTPASSWORD())}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login

