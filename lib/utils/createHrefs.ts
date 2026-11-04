export function createHref(page: number, selectedId: number | null) {
	const params = new URLSearchParams({ page: String(page) });
	if (selectedId) {
		params.set("selected", String(selectedId));
	}
	return `?${params}`;
}
