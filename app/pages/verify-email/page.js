"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import PageRoutes from '@/utilis/PageRoute';

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `https://event-mangement-backend-sj7x.onrender.com/api/verify-email/${token}`
        );

        if (response.status === 200) {
          setStatus('success');
          router.push(PageRoutes.LOGIN());
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, []);

  if (status === 'loading') {
    return <p>Verifying your email...</p>;
  }

  if (status === 'success') {
    return <p>Email verified successfully! Redirecting...</p>;
  }

  return <p>Verification failed. Please try again later.</p>;
};
const VerifyEmail = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <VerifyEmailContent />
  </Suspense>
);

export default VerifyEmail;
