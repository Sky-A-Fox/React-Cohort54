import { useDebugValue } from 'react';
import { useWindowSize } from './useWindowSize';

export function useScreenRange(minWidth: number, maxWidth: number, label: string) {
  const { width } = useWindowSize();
  const isInRange = width >= minWidth && width <= maxWidth;

  useDebugValue(`${label}: ${isInRange ? 'active' : 'inactive'}`);

  return isInRange;
}
