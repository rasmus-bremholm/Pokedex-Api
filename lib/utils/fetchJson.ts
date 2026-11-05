export async function fetchJson<T>(url: string): Promise<T> {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`PokeAPI ${response.status}: ${url}`);
	return response.json() as Promise<T>;
}
