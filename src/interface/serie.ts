export default interface Serie {
	available: number;
	returned: number;
	collectionURI: string;
	items: Array<SeriesSummary>;
}

interface SeriesSummary {
	resourceURI: string;
	name: string;
}
