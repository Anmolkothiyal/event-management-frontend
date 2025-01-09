import { useDispatch } from "react-redux"
import { logout, setUser } from "@/redux/slice/auth.slice"
import {setEvents,setPreviousEvents} from "@/redux/slice/event.Slice"


const useActionDispatch = ()=>{
    const dispatch = useDispatch()


    return({
        setUser:(e) => dispatch(setUser(e)),
        logout:(e) => dispatch(logout(e)),
        setEvents:(e) => dispatch(setEvents(e)),
        setPreviousEvents:(e) => dispatch(setPreviousEvents(e)),
        
    })

}
export default useActionDispatch