import React, { FC } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import {
	SafeAreaView,
	Text,
	FlatList,
	StyleSheet,
	Platform,
	
} from 'react-native';
import colors from '../../../../styles/colors';
import Hero from '../../../interface/hero';

import marvelApi from '../../../services/marvelApi';
import { CardHeroPrimary } from '../../../shared/components/Card/CardHeroPrimary';
import { Load } from '../../../shared/components/Load';

export const ListHeroesContainer: FC = () => {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	let [offset, setOffset] = useState(0);
	const limit: number = 10;

	useEffect(() => {
		async function loadHeroes() {
			const { data } = await marvelApi.loadHeroes(offset, limit);

			if (!data) setHeroes([]);

			setHeroes(data.results);
			setTotal(data.total);
			setLoading(false);
		}

		loadHeroes();
	}, []);

	const handleFetchMore = useCallback(
		async (distance: number) => {
			setOffset((offset += limit));

			if (distance < 1) return;

			const { data } = await marvelApi.loadHeroes(offset, limit);

			if (data.results.length === 0) return;

			if (heroes.length === total) return;

			const newArray = data.results;

			setHeroes((oldValues) => [...oldValues, ...newArray]);
		},
		[heroes]
	);

	if (loading) return <Load />;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.listHeroes}>
				{heroes && (
					<FlatList
						data={heroes}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item }) => (
							<CardHeroPrimary data={item} onPress={() => {}} />
						)}
						showsVerticalScrollIndicator={false}
						numColumns={2}
						onEndReachedThreshold={0.1}
						onEndReached={({ distanceFromEnd }) =>
							handleFetchMore(distanceFromEnd)
						}
					/>
				)}
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
});
