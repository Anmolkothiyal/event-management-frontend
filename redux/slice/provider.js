"use client";

// import { useEffect } from "react";
import { Provider } from "react-redux";
import store from '@/redux/store'

// import useConfigHooks from "@/hooks/useConfigHooks";

export function Providers({ children }) {

    // const { restoreCookies } = useConfigHooks(store)

    // useEffect(() => {
    // restoreCookies()
    // }, [])

    return (
        <Provider store={store}>{children}</Provider>
    )

}