import { Card } from '@/data/cards/cards.types';
import { usePrevious } from '@/utils/previous.hooks';
import { useEffect, useRef } from 'react';

export const useAddCard = (currentCardsLength: number) => {
  const lastCardRef = useRef<HTMLDivElement>(null);
  const idOfNewlyAddedCard = useRef<Card['id'] | null>(null);
  const previousCardsLength = usePrevious(currentCardsLength);

  useEffect(() => {
    if (previousCardsLength === currentCardsLength) return;

    lastCardRef.current?.scrollIntoView({ behavior: 'smooth' });
    idOfNewlyAddedCard.current = null;
  }, [previousCardsLength, currentCardsLength]);

  const scrollToCardId = (id: Card['id']) => {
    idOfNewlyAddedCard.current = id;
  };

  return {
    idOfNewlyAddedCard,
    scrollToCardId,
    lastCardRef,
  };
};
