'use client';
 
import { useState, useEffect } from 'react';
// import icons from '@/env/icons';
 
const PWABanner = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
 
    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
        };
 
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
 
 
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
        }
 
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);
 
    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA installation accepted');
                    setIsInstalled(true);
                } else {
                    console.log('PWA installation dismissed');
                }
                setDeferredPrompt(null);
            });
        }
    };
 
    if (isInstalled || !deferredPrompt) return null;
 
    return (
        <button onClick={handleInstallClick} className="btn btn-sm">
        {/* <img src={icons.PWA} alt="Install Icon"/> */}
            Install App
        </button>
    );
};
 
export default PWABanner;