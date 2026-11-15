export function generateRandomEmail(prefix: string): string {
  const random: number = Math.floor(Math.random() * 10000);
  return `${prefix}_${random}@test.com`;
}
export function calculateDiscountedPrice(
  price: number,
  discountPersent: number,
): number {
  const discount: number = price * (discountPersent / 100);
  return price - discount;
}
