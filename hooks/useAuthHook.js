import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import changeHandlerHelper from "./helper/changeHandler"
import PageRoutes from "@/utilis/PageRoute"
import Api from "@/services/EndPoint"
import axios from "axios"


const initialSignUpBody = {
    name: "",
    email: "",
    password: "",
    role: "attendee"
};

const initialLogInBody = {
    email: "",
    password: ""
};

const initialForgotPasswordBody = { email: "" }
const initialVerifyOtpBody = { email: "", otp: "" }
const initialResetPasswordBody = { email: "", newPassword: "", confirmPassword: "" }

const UseAuthHook = () => {
    const router = useRouter();
    const [authState, setAuthState] = useState({ ...initialSignUpBody })
    const [authLoginState, setAuthLoginState] = useState({ ...initialLogInBody })
    const [authForgotPasswordState, setAuthForgetPasswordState] = useState({ ...initialForgotPasswordBody })
    const [authVerifyOtpState, setauthVerifyOtpState] = useState({ ...initialVerifyOtpBody })
    const [authResetPasswordState, setAuthResetPasswordState] = useState({ ...initialResetPasswordBody })
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const fetchUserByEmail = async (email) => {
        try {
            const response = await axios.get(`https://event-mangement-backend-sj7x.onrender.com/api/user?email=${email}`)
            return response.data.users.find(user => user.email === email)
        } catch (error) {
            toast.error("Failed to fetch user")
            return null
        }
    }

    const SignUpSubmitHandler = async (e) => {
        e.preventDefault()
        const { name, email, password } = authState
        if (!name || !email || !password) {
            toast.error("All fields are required.")
            return
        }
        try {
            const response = await axios.post(Api.SIGNUP(), authState)
            if (response.status === 200) {
                toast.success("Registration successful! Redirecting to login...")
                setAuthState({ ...initialSignUpBody })
                setTimeout(() => router.push(PageRoutes.LOGIN()), 2000)
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred. Please try again.")
        }
    }

    const LoginSubmitHandler = async (e) => {
      e.preventDefault()  
      try {
          const user = await fetchUserByEmail(authLoginState.email)
  
          if (!user) {
              toast.error("Error: User not found.")
              return
          }
          const response = await axios.post(Api.LOGIN(), authLoginState)
          if (response.status === 200) {
              toast.success("Login successful!")
              if (user.role === "admin") {
                  router.push(PageRoutes.ADMINDASBOARD())
              } else {
                  router.push(PageRoutes.DASHBOARD())
              }
          }
      } catch (err) {
          toast.error(err.response?.data?.message || "Invalid email or password. Please try again.");
      }
  }

    const ForgotPasswordSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(Api.SENDOTP(), authForgotPasswordState)
            if (response.status === 200) {
                toast.success("OTP sent successfully!")
                router.push(PageRoutes.VERIFYOTP())
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred. Please try again.")
        }
    }

    const VerifyOtpSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Api.VERIFYOTP(), authVerifyOtpState)
            if (response.status === 200) {
                toast.success("OTP verified successfully!")
                router.push(PageRoutes.RESETPASSWORD())
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP. Please try again.")
        }
    }

    const resetPasswordSubmitHandler = async (e) => {
        e.preventDefault();
        const { email, newPassword, confirmPassword } = authResetPasswordState;
        if (!email || !newPassword || !confirmPassword) {
            toast.error("All fields are required.")
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.")
            return
        }
        try {
            const response = await axios.post(Api.RESETPASSWORD(), authResetPasswordState)
            if (response.status === 200) {
                toast.success("Password reset successful! Redirecting to login...")
                setTimeout(() => router.push(PageRoutes.LOGIN()), 2000)
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred. Please try again.")
        }
    };

    return {
        authState,
        authLoginState,
        authForgotPasswordState,
        authVerifyOtpState,
        authResetPasswordState,
        showPassword,
        router,
        SignUpSubmitHandler,
        LoginSubmitHandler,
        ForgotPasswordSubmitHandler,
        VerifyOtpSubmitHandler,
        resetPasswordSubmitHandler,
        togglePasswordVisibility,
        signupChangeHandler: (e) => changeHandlerHelper(e, authState, setAuthState),
        loginChangeHandler: (e) => changeHandlerHelper(e, authLoginState, setAuthLoginState),
        forgotPasswordChangeHandler: (e) => changeHandlerHelper(e, authForgotPasswordState, setAuthForgetPasswordState),
        verifyOtpChangeHandler: (e) => changeHandlerHelper(e, authVerifyOtpState, setauthVerifyOtpState),
        resetPasswordChangeHandler: (e) => changeHandlerHelper(e, authResetPasswordState, setAuthResetPasswordState)
    }
}

export default UseAuthHook
