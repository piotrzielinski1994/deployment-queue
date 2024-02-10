import React, { useState, useEffect, ComponentType, ComponentProps } from 'react';

const withRuntime = <P,>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return <></>;
    }

    return <WrappedComponent {...(props as any)} />;
  };
};

export default withRuntime;
