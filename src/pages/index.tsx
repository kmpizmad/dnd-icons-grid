import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import icons from '../utils/icons';

const Main = dynamic(() => import('../layouts/Main'), { ssr: false });

export default function Home() {
  const sprites = useMemo(() => {
    return Object.entries(icons).map(([key, value]) => ({
      characterId: key,
      url: value.image.src,
      displayName: value.displayName,
    }));
  }, []);

  return <Main sprites={sprites} />;
}
