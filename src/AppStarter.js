import {useEffect, useState} from 'react';

export default function AppStarter({delay = 2000, children}) {
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsSplashScreen(false), delay);
  }, [delay]);
  return children(isSplashScreen);
}
