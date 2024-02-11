export interface Tag {
  id: `tag__${string}`;
  label: string;
  bgColor: `hsl(${number}, ${number}%, ${number}%)`;
}

export const TAG_CONTAINER = 'tags';
