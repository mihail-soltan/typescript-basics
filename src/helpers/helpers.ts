export function isToday(date: Date): boolean {
  const today = new Date();
  const todaysDate = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const convertedToday = `${todaysDate}/${month}/${year}`;

  const comparingWithDate = new Date(date);

  const compareDay = comparingWithDate.getDate();
  const compareMonth = comparingWithDate.getMonth();
  const compareYear = comparingWithDate.getFullYear();

  const converted = `${compareDay}/${compareMonth}/${compareYear}`;

  return convertedToday === converted;
}

export const passwordsMatch = (pass: string, repeatedPass: string): boolean => {
  return repeatedPass === pass;
};
