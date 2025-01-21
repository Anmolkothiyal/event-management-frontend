import axios from "@/services/axios"
import { useRouter } from "next/navigation"
import "chart.js/auto"
import Api from "@/services/EndPoint"
import useActionDispatch from "./useActionDispatch"
import { useSelector } from "react-redux"

const useDashboardHook = ()=>
{

    const{setDashboard}=useActionDispatch()
    const {dashboard}=useSelector((state) => state.dashboardSlice)
    const router = useRouter()
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]
    const fetchStats = async () => {
        try {
          const response = await axios.get(Api.DASHBOARDSTATS())
          setDashboard(response.data)
        } catch (error) {
          console.error("Failed to fetch stats:", error)
        }
      }
      const handleNavigation = (path) => {
        router.push(path)
      }
    
      const pieData = {
        labels: ["Admin Users", "Normal Users"],
        datasets: [
          {
            data: [dashboard.adminUsers, dashboard.normalUsers],
            backgroundColor: [COLORS[0], COLORS[1]],
          },
        ],
      }
    
      const barData = {
        labels: ["Total Events", "Previous Events", "Total Feedback"],
        datasets: [
          {
            label: "value",
            data: [dashboard.totalEvents, dashboard.previousEvents, dashboard.totalFeedback],
            backgroundColor: [COLORS[0]],
          },
        ],
      }
    return(
       {
        fetchStats,
        router,
        pieData,
        barData,
        handleNavigation
        
       }
    )
    

}
export default useDashboardHook