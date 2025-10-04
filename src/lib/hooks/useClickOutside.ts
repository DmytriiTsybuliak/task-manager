import { useEffect, RefObject } from 'react';

export function useClickOutside(ref: RefObject<HTMLDivElement | null>, handler: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // if (ref) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
      // } else return;
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, handler]);
}
