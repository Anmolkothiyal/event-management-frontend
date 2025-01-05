"use client"

import UseAuthHook from "@/hooks/useAuthHook"
import PageRoutes from "@/utilis/PageRoute"
import { UserPlus, Eye, EyeOff } from 'lucide-react'


const RegisterPage = () => {
  const { 
    authState,
    signupChangeHandler,
    SignUpSubmitHandler,
    togglePasswordVisibility,
    router,
    showPassword
  } = UseAuthHook();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20">
      <div className="w-full max-w-md transform transition-all">
        <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-8">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-primary p-3 shadow-lg">
              <UserPlus className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Create an account</h2>
            <p className="text-center text-muted-foreground mb-6">Please enter your details to sign up</p>
          </div>
          <form onSubmit={SignUpSubmitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={authState.name}
                onChange={signupChangeHandler}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input hover:border-ring focus:outline-none border-black transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={authState.email}
                onChange={signupChangeHandler}
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
                  value={authState.password}
                  onChange={signupChangeHandler}
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
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none transition-colors font-medium"
            >
              Sign up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => router.push(PageRoutes.LOGIN())}
                className="text-primary hover:text-primary/80 text-blue-500 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

