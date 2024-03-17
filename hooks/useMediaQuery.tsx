import { useEffect, useState } from 'react';

type MediaQueryOptions = {
  query: string;
};

type MediaQueryState = {
  matches: boolean;
};

const useMediaQuery = ({ query }: MediaQueryOptions): MediaQueryState => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMediaQueryChange = (
      e: MediaQueryList | MediaQueryListEvent
    ) => {
      setMatches(e.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [query]);

  return { matches };
};

export default useMediaQuery;
