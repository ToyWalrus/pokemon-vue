export function getIdFromUrl(url: string) {
  let id: number;
  if (url.startsWith('http')) {
    const urlParts = url.split('/');
    id = Number(urlParts[urlParts.length - 2]);
  } else {
    id = Number(url);
  }
  return id;
}
