import React, { useState, useEffect, ComponentType } from 'react';

const withRuntime = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return <></>; // Return null instead of empty fragment for unmounted state
    }

    return <WrappedComponent props={props} />;
  };
};

export default withRuntime;
