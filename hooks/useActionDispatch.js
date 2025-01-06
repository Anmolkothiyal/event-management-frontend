import { useDispatch } from "react-redux"
import { setUser } from "@/redux/slice/auth.slice"


const useActionDispatch = ()=>{
    const dispatch = useDispatch()


    return({
        setUser:(e) => dispatch(setUser(e))
        
        
    })

}
export default useActionDispatch