import axios from 'axios';
import md5 from 'md5';
import Hero from '../interface/hero';

function generateApiKey() {
	const keyPublic = '5b972910803bd95c82a58a4840435b52';
	const keyPrivate = '8ad2fedead17bb5a28c431905994d6edc4fea5cf';
	const ts = Date.now();

	const hash = md5(ts + keyPrivate + keyPublic);

	return `ts=${ts}&apikey=${keyPublic}&hash=${hash}`;
}

interface MarvelData {
	data: {
		offset: number;
		limit: number;
		total: number;
		count: number;
		results: Array<Hero>;
	};
}

class MarvelApi {
	private baseURL: String = 'https://gateway.marvel.com:443/v1/public';

	async loadHeroes(offset: number, vLimit: number): Promise<MarvelData> {
		const {
			data: { data },
		} = await axios.get(
			`${
				this.baseURL
			}/characters?orderBy=name&limit=${vLimit}&offset=${offset}&${generateApiKey()}`
		);

		return {
			data,
		};
	}

	async getHero(idHero: number): Promise<MarvelData> {
		const {
			data: { data },
		} = await axios.get(
			`${this.baseURL}/characters/${idHero}?${generateApiKey()}`
		);

		return {
			data,
		};
	}

	async heroName(name: string): Promise<MarvelData> {
		const {
			data: { data },
		} = await axios.get(
			`${this.baseURL}/characters?nameStartsWith=${name}&${generateApiKey()}`
		);

		return { data };
	}

	async getComics(idHero: number) {
		const {
			data: {
				data: { results },
			},
		} = await axios.get(
			`${this.baseURL}/characters/${idHero}/comics?${generateApiKey()}`
		);

		return { results };
	}

	async getSeries(idHero: number) {
		const {
			data: {
				data: { results },
			},
		} = await axios.get(
			`${this.baseURL}/characters/${idHero}/series?${generateApiKey()}`
		);

		return { results };
	}
}

export default new MarvelApi();
