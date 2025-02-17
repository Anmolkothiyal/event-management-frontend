'use client';

import { useState, useEffect } from 'react';

const PWABanner = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSPrompt, setShowIOSPrompt] = useState(false);

    useEffect(() => {
        // Detect iOS (Safari doesn't support `beforeinstallprompt`)
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIOSDevice);

        // Check if running as a PWA
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
        }

        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

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
        } else if (isIOS) {
            setShowIOSPrompt(true);
        }
    };

    if (isInstalled) return null;

    return (
        <>
            <button onClick={handleInstallClick} className="btn btn-sm bg-blue-600 text-white px-4 py-2 rounded-md">
                Install App
            </button>

            {/* iOS Install Instructions */}
            {showIOSPrompt && isIOS && (
                <div className="fixed bottom-4 left-4 right-4 bg-white shadow-lg p-4 rounded-lg text-gray-900">
                    <p className="text-sm">
                        To install the app on iOS, tap the <strong>Share</strong> icon and select{' '}
                        <strong>"Add to Home Screen"</strong>.
                    </p>
                    <button onClick={() => setShowIOSPrompt(false)} className="mt-2 text-blue-500 text-sm">
                        Got it!
                    </button>
                </div>
            )}
        </>
    );
};

export default PWABanner;
