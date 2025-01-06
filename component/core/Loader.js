"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const Loader = () => {

    const { loader } = useSelector((state) => state.loaderSlice)

    useEffect(() => {
        if (loader) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [loader])
    return (
        loader && (
            <div className="full-page-loader">
                <div className="loadingio-spinner-rolling-wiv0nnj0cz">
                    <div className="ldio-ndvy05pkd1b">
                        <div></div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Loader;