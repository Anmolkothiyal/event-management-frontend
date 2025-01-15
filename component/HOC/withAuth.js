
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import PageRoutes from '@/utilis/PageRoute';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);

        if (!isAuthenticated) {
            router.push(PageRoutes.LOGIN())
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
