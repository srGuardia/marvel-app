import React, { FC, useState, useCallback, useEffect } from 'react';
import { View, Alert } from 'react-native';
import {
	SafeAreaView,
	FlatList,
	StyleSheet,
	Platform,
	Modal,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';

import colors from '../../../../styles/colors';
import Hero from '../../../interface/hero';
import marvelApi from '../../../services/marvelApi';
import { CardHeroPrimary } from '../../../shared/components/Card/CardHeroPrimary';
import { Load } from '../../../shared/components/Load';
import { setHeroFavorite } from '../../../shared/utils/utils';
import { HeroDetailContainer } from '../HeroDetail';

export const ListHeroesContainer: FC = () => {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	let [offset, setOffset] = useState(0);
	const limit: number = 10;
	let [visible, setVisible] = useState(false);
	let [selectedHero, setSelectedHero] = useState({} as Hero);
	const [herosFilter, setHerosFilter] = useState<Hero[] | null>(null);
	let [nameHero, setNameHero] = useState('');

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

	const handleFavoriteHero = useCallback(async (hero: Hero) => {
		Alert.alert('Herói', 'Adicionado aos favoritos!', [{ text: 'OK' }]);

		await setHeroFavorite(hero);
	}, []);

	const handleModal = useCallback((hero: Hero) => {
		setSelectedHero(hero);
		setVisible(!visible);
	}, []);

	const handleInputChange = useCallback((name: string) => {
		setNameHero(name);
	}, []);

	const handleSearchHero = useCallback(async () => {
		if (nameHero === '') setHerosFilter(null);
		else {
			setLoading(true);
			const { data } = await marvelApi.heroName(nameHero);

			setHerosFilter(data.results);
			setLoading(false);
		}
	}, [nameHero]);

	if (loading) return <Load />;

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<View style={styles.listHeroes}>
					<TextInput
						placeholder='Busque seu herói'
						value={nameHero}
						style={styles.inputText}
						onChangeText={handleInputChange}
						onBlur={handleSearchHero}
					/>

					<FlatList
						data={!herosFilter ? heroes : herosFilter}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item }) => (
							<CardHeroPrimary data={item} onPress={() => handleModal(item)} />
						)}
						showsVerticalScrollIndicator={false}
						numColumns={2}
						onEndReachedThreshold={0.1}
						onEndReached={({ distanceFromEnd }) =>
							handleFetchMore(distanceFromEnd)
						}
					/>
				</View>
			</KeyboardAvoidingView>

			<Modal animationType='slide' visible={visible}>
				<HeroDetailContainer
					selectedHero={selectedHero}
					handleVisible={() => setVisible(!visible)}
					handleFavoriteHero={() => handleFavoriteHero(selectedHero)}
				/>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: colors.gray,
		paddingVertical: Platform.OS === 'android' ? 30 : 0,
	},
	listHeroes: {
		flex: 1,
		paddingHorizontal: 32,
		justifyContent: 'center',
	},
	inputText: {
		borderBottomWidth: 1,
		borderColor: colors.red,
		color: colors.black,
		backgroundColor: colors.white,
		fontSize: 14,
		padding: 10,
		textAlign: 'center',
	},
});
