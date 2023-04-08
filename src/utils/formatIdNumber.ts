export function formatIdNumber(id: string | number) {
  const num = typeof id === 'number' ? id : Number(id);
  return num < 10 ? `00${num}` : num < 100 ? `0${num}` : num.toString();
}
