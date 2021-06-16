export default interface Storie {
	available: number;
	returned: number;
	collectionURI: string;
	items: Array<StorieSummary>;
}

interface StorieSummary {
	resourceURI: string;
	name: string;
}
