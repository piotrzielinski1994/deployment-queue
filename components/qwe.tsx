'use client';

import React, { useEffect, useState } from 'react';
import Asd from './asd';

const Qwe = () => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  if (!winReady) {
    return <></>;
  }

  return <Asd />;
};

export default Qwe;
