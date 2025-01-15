"use client"
import useUserHooks from "@/hooks/useUserHooks"
import { useEffect } from "react"

const AdminDashboard = ()=>
{
  const{
    fetchUsers

  }=useUserHooks()
  useEffect(() => {
     fetchUsers();
   }, []);
 
  return(
    <>
    <h1 className="text-center">Welcome to admin AdminDashboard</h1>
    </>
  )
}
export default AdminDashboard