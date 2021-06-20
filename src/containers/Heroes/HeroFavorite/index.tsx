import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, FlatList, StyleSheet, Platform } from 'react-native';

import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import Hero from '../../../interface/hero';
import { CardHeroSecundary } from '../../../shared/components/Card/CardHeroSecundary';
import { Load } from '../../../shared/components/Load';
import { getHerosFavorite } from '../../../shared/utils/utils';

export const HeroFavoriteContainer: FC = () => {
	const [herosFavorite, setHerosFavorite] = useState<Hero[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getStorageHeros() {
			const heroStorage = await getHerosFavorite();

			if (heroStorage.length === 0) return alert('Não há heróis favoritos!');

			setHerosFavorite(heroStorage);
			setLoading(false);
		}

		getStorageHeros();
	}, [herosFavorite]);

	if (loading) return <Load />;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.listHeroes}>
				<FlatList
					data={herosFavorite}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => <CardHeroSecundary data={item} />}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					onEndReachedThreshold={0.1}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.gray,
		paddingVertical: Platform.OS === 'android' ? 30 : 0,
	},
	listHeroes: {
		flex: 1,
		paddingHorizontal: 32,
		justifyContent: 'center',
	},
	noData: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 30,
		textAlign: 'center',
		color: colors.white,
		fontFamily: fonts.heading,
	},
	emoji: {
		fontSize: 50,
		color: colors.red,
	},
});
