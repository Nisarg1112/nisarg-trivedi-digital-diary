import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className="loader-container">
      <div 
        className="loader-bar" 
        style={{ 
          width: loading ? '90%' : '0%',
          opacity: loading ? 1 : 0
        }}
      />
    </div>
  );
}
