"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
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
          router.push('/auth/login?verified=true');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token, router]);

  if (status === 'loading') {
    return <p>Verifying your email...</p>;
  }

  if (status === 'success') {
    return <p>Email verified successfully! Redirecting...</p>;
  }

  return <p>Verification failed. Please try again later.</p>;
};

export default VerifyEmail;
