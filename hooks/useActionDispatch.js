import { useDispatch } from "react-redux"
import { logout, setUser } from "@/redux/slice/auth.slice"


const useActionDispatch = ()=>{
    const dispatch = useDispatch()


    return({
        setUser:(e) => dispatch(setUser(e)),
        logout:(e) => dispatch(logout(e))
        
    })

}
export default useActionDispatch