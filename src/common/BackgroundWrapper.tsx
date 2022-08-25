import { useEffect, useState } from 'react';

import a from '../assets/includedBackgrounds/a.png';
import b from '../assets/includedBackgrounds/b.png';
import c from '../assets/includedBackgrounds/c.png';
import CrossfadeImage from './CrossfadeImage';

const includedBackgrounds = [a, b, c];

function BackgroundWrapper() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const itv = setInterval(() => {
      let currentIndex = imageIndex;
      while (currentIndex === imageIndex) {
        currentIndex = Math.floor(Math.random() * includedBackgrounds.length);
      }
      setImageIndex(currentIndex);
    }, 20000);

    return () => {
      clearInterval(itv);
    };
  }, []);

  return (
    <div className="w-full h-full absolute">
      <CrossfadeImage duration={1000} src={includedBackgrounds[imageIndex]} />
    </div>
  );
}

export default BackgroundWrapper;
