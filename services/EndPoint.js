
const BASE_URL = "https://event-mangement-backend-sj7x.onrender.com/api"

const Api = {
    //auth api
    SIGNUP:()=>`${BASE_URL}/register`,
    LOGIN:()=>`${BASE_URL}/login`,
    SENDOTP:()=>`${BASE_URL}/send-otp`,
    VERIFYOTP:()=>`${BASE_URL}/verify-otp`,
    RESETPASSWORD:()=>`${BASE_URL}/reset-password`,
    USER:()=>`${BASE_URL}/user`

}
export default Api