import axios from "@/services/axios"
import { useRouter } from "next/navigation"
import "chart.js/auto"
import Api from "@/services/EndPoint"
import useActionDispatch from "./useActionDispatch"
import { useSelector } from "react-redux"
import PageRoutes from "@/utilis/PageRoute"

const useDashboardHook = () => {
  const { setDashboard } = useActionDispatch();
  const { dashboard } = useSelector((state) => state.dashboardSlice);
  const router = useRouter();
  
  const COLORS = {
    primary: "#0088FE",
    secondary: "#00C49F",
    accent: "#FFBB28"
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(Api.DASHBOARDSTATS());
      setDashboard(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const safeData = dashboard || {
    totalUsers: 0,
    totalEvents: 0,
    totalFeedback: 0,
    adminUsers: 0,
    normalUsers: 0,
    previousEvents: 0
  };

  const statsCards = [
    {
      title: "Total Users",
      value: safeData.totalUsers,
      color: COLORS.primary,
      route: PageRoutes.USER(),
      icon: "👥"
    },
    {
      title: "Current Events",
      value: safeData.totalEvents,
      color: COLORS.secondary,
      route: PageRoutes.EVENT(),
      icon: "🎉"
    },
    {
      title: "Total Feedback",
      value: safeData.totalFeedback,
      color: COLORS.accent,
      route: PageRoutes.FEEDBACK(),
      icon: "💬"
    }
  ];

  const pieData = {
    labels: ["Admin Users", "Normal Users"],
    datasets: [{
      data: [
        safeData.adminUsers || 0, 
        safeData.normalUsers || 0
      ],
      backgroundColor: [COLORS.primary, COLORS.secondary],
    }]
  };

  const barData = {
    labels: ["Metrics"],
    datasets: [
        {
            label: "Total Events",
            data: [safeData.totalEvents || 0],
            backgroundColor: COLORS.primary,
        },
        {
            label: "Previous Events",
            data: [safeData.previousEvents || 0],
            backgroundColor: COLORS.secondary,
        },
        {
            label: "Total Feedback",
            data: [safeData.totalFeedback || 0],
            backgroundColor: COLORS.accent,
        }
    ]
};

  return {
    fetchStats,
    router,
    pieData,
    barData,
    handleNavigation,
    statsCards
  };
};

export default useDashboardHook;