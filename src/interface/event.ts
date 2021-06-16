export default interface Event {
	available: number;
	returned: number;
	collectionURI: string;
	items: Array<EventSummary>;
}

interface EventSummary {
	resourceURI: string;
	name: string;
}
