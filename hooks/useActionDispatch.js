import { useDispatch } from "react-redux"
import { logout, setUser, setLoginDetails } from "@/redux/slice/auth.slice"
import {setEvents,setPreviousEvents} from "@/redux/slice/event.Slice"
import { setTickets } from "@/redux/slice/ticket.slice"


const useActionDispatch = ()=>{
    const dispatch = useDispatch()


    return({
        setUser:(e) => dispatch(setUser(e)),
        logout:(e) => dispatch(logout(e)),
        setEvents:(e) => dispatch(setEvents(e)),
        setPreviousEvents:(e) => dispatch(setPreviousEvents(e)),
        setTickets:(e) => dispatch(setTickets(e)),
        setLoginDetails:(e) => dispatch(setLoginDetails(e)),
        
    })

}
export default useActionDispatch