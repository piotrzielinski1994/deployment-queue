import { ForwardedRef, LegacyRef } from 'react';

export const mergeRefs = <T>(...refs: ForwardedRef<T>[]): LegacyRef<T> => {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') return ref(node);
      ref.current = node;
    });
  };
};
