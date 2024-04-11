type FncType = (text: string) => string;
export function firstLetterToUpperCase<FncType>(text: string) {
  return text && `${text.charAt(0)?.toLocaleUpperCase()}${text.slice(1)}`;
}
