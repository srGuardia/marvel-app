export default interface Comic {
	available: number;
	returned: number;
	collectionURI: string;
	items: Array<ComicSummary>;
}

interface ComicSummary {
	resourceURI: string;
	name: string;
}
