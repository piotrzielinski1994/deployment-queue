import { v4 as uuid } from 'uuid';

export const generateId = <T extends string>(prefix: T): `${T}__${string}` => {
  return `${prefix}__${uuid()}`;
};

export const generateColumnId = () => generateId('column');
export const generateCardId = () => generateId('card');
export const generateTagId = () => generateId('tag');
