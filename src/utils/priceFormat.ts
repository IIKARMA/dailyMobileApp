type FncType = (price: string | undefined) => string;

export function priceFormat<FncType>(price: number) {
  try {
    return price ? `${price?.toFixed(2 || 1)} грн` : '';
  } catch (error) {
    console.log(error);
  }
}
