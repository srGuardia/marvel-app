import Comic from './comic';
import Event from './event';
import Serie from './serie';
import Storie from './storie';

export default interface Hero {
	id: number;
	name: string;
	description: string;
	modified: Date;
	resourceURI: string;
	urls: Array<any>;
	thumbnail: {
		extension: string;
		path: string;
	};
	comics: Comic;
	stories: Storie;
	events: Event;
	series: Serie;
}
