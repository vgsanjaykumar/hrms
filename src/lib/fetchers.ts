// Placeholder for API fetcher functions

export async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
}
