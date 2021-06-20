import React, { FC, useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	Image,
	FlatList,
	ScrollView,
} from 'react-native';

import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import Hero from '../../../interface/hero';
import marvelApi from '../../../services/marvelApi';
import { randomColor } from '../../../shared/utils/utils';
import { CardDetails } from '../../../shared/components/Card/CardDetails';
import { Load } from '../../../shared/components/Load';

interface HeroDetailData {
	selectedHero: Hero;
	handleVisible: () => void;
	handleFavoriteHero: (hero: Hero) => void;
}

interface ResultData {
	id: string;
	title: string;
	thumbnail: {
		extension: string;
		path: string;
	};
}

export const HeroDetailContainer: FC<HeroDetailData> = ({
	selectedHero,
	handleVisible,
	handleFavoriteHero,
}) => {
	const [hero, setHero] = useState<Hero[]>([]);
	const [comics, setComics] = useState<ResultData[]>([]);
	const [series, setSeries] = useState<ResultData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function heroDetail() {
			const { data } = await marvelApi.getHero(selectedHero.id);

			if (!data) setHero([]);

			setHero(data.results);

			const { results } = await marvelApi.getComics(selectedHero.id);

			setComics(results);

			const series = await marvelApi.getSeries(selectedHero.id);

			setSeries(series.results);

			setLoading(false);
		}
		heroDetail();
	}, []);

	if (loading) return <Load />;

	return (
		<View style={styles.container}>
			{hero &&
				hero.map((item, index) => (
					<View style={styles.header} key={item.id || index}>
						<Image
							source={{
								uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
							}}
							style={styles.image}
						/>
						<Text style={styles.title}>{item.name}</Text>
					</View>
				))}

			<ScrollView>
				{comics.length !== 0 && (
					<>
						<Text style={styles.textComics}>Comics</Text>
						<FlatList
							data={comics}
							keyExtractor={(item) => String(item.id)}
							renderItem={({ item }) => <CardDetails data={item} />}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</>
				)}

				{series.length !== 0 && (
					<>
						<Text style={styles.textComics}>Series</Text>
						<FlatList
							data={series}
							keyExtractor={(item) => String(item.id)}
							renderItem={({ item }) => <CardDetails data={item} />}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</>
				)}
			</ScrollView>
			<Pressable
				style={styles.buttonFavorite}
				onPress={() => handleFavoriteHero(selectedHero)}
			>
				<Text style={styles.textButton}>Favoritar</Text>
			</Pressable>
			<Pressable style={styles.button} onPress={handleVisible}>
				<Text style={styles.textButton}>Fechar Modal</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderColor: randomColor(),
		borderWidth: 3,
	},
	title: {
		fontFamily: fonts.heading,
		fontSize: 18,
		marginVertical: 10,
	},
	textComics: {
		fontFamily: fonts.heading,
		fontSize: 20,
		fontWeight: 'bold',
		marginVertical: 10,
		textAlign: 'center',
		height: 30,
	},
	button: {
		width: '100%',
		backgroundColor: colors.red,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonFavorite: {
		width: '100%',
		backgroundColor: colors.black,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	textButton: {
		color: colors.white,
		fontSize: 16,
		fontFamily: fonts.heading,
	},
});
