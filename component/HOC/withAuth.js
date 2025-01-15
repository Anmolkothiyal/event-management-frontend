"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import PageRoutes from '@/utilis/PageRoute';
import Cookies from 'js-cookie';

const withAuth = (Component) => {
    
    return (props) => {
        const router = useRouter();
        
        useEffect(() => {
            const loginDetails = Cookies.get('loginDetails')
                ? JSON.parse(Cookies.get('loginDetails'))
                : null;

            if (!loginDetails || !loginDetails.isauth) {
                router.push(PageRoutes.LOGIN());
            }
        }, [router]);

        return <Component {...props} />;
    };
};

export default withAuth;
