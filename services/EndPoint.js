
const BASE_URL = "https://event-mangement-backend-sj7x.onrender.com/api"

const Api = {
    //auth api
    SIGNUP:()=>`${BASE_URL}/register`,
    LOGIN:()=>`${BASE_URL}/login`,
    SENDOTP:()=>`${BASE_URL}/send-otp`,
    VERIFYOTP:()=>`${BASE_URL}/verify-otp`,
    RESETPASSWORD:()=>`${BASE_URL}/reset-password`,
    USER:()=>`${BASE_URL}/user`,
   //event api
   EVENT:()=>`${BASE_URL}/events`,
   PREVIOUEVENT:()=>`${BASE_URL}/previousevent`,
   //ticket api
   TICKETS: () => `${BASE_URL}/tickets`,
   ALLTICKETS: () => `${BASE_URL}/all-events`,
   DASHBOARDSTATS:()=>`${BASE_URL}/dashboard/stats`,
   FEEDBACK:()=>`${BASE_URL}/feedback`,
}
export default Api