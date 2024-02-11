export const mergeClasses = (...classNames: (string | undefined)[]): string => {
  return classNames.filter(Boolean).join(' ');
};
