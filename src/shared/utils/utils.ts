import AsyncStorage from '@react-native-async-storage/async-storage';
import Hero from '../../interface/hero';

interface StorageStateProps {
	[id: string]: {
		data: Hero;
	};
}

export async function getHerosFavorite(): Promise<Hero[]> {
	const storageHero = await AsyncStorage.getItem('@marvelApp:favorites');
	// AsyncStorage.clear();
	const heros = storageHero
		? (JSON.parse(storageHero) as StorageStateProps)
		: {};

	const listHeros = Object.keys(heros).map((hero) => {
		return {
			...heros[hero].data,
		};
	});

	return listHeros;
}

export async function setHeroFavorite(hero: Hero): Promise<void> {
	const data = await AsyncStorage.getItem('@marvelApp:favorites');
	const oldHeros = data ? (JSON.parse(data) as StorageStateProps) : {};

	const newHero = {
		[hero.id]: {
			data: hero,
		},
	};

	await AsyncStorage.setItem(
		'@marvelApp:favorites',
		JSON.stringify({ ...newHero, ...oldHeros })
	);
}

export function randomColor(opacity: number = 1) {
	let r = Math.random() * 255;
	let g = Math.random() * 255;
	let b = Math.random() * 255;

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
