import { ForwardedRef } from 'react';

export const mergeRefs = <T>(...refs: ForwardedRef<T>[]) => {
  return (node) => {
    console.log('@@@ typeof node | ', typeof node);
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') return ref(node);
      ref.current = node;
    });
  };
};
