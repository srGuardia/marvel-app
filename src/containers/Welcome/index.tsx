import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import colors from '../../../styles/colors';
import { AntDesign } from '@expo/vector-icons';
import fonts from '../../../styles/fonts';

export const WelcomeContainer: FC = () => {
	const { navigate } = useNavigation();

	const handleNavigate = () => {
		navigate('ListHeroes');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Seja,</Text>
				<Text style={styles.subTitle}>bem vindo 😍</Text>
			</View>

			<View style={styles.content}>
				<Text style={styles.textContent}>
					Aqui você encontrará os mais diversificados heróis {'\n'}e descobrirá
					sobre suas histórias {'\n'}
				</Text>
				<Text style={styles.heroes}>🦸🦸‍♂️🦸‍♀️</Text>
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.button}
					onPress={handleNavigate}
				>
					<AntDesign name='right' style={styles.buttonIcon} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		marginTop: 30,
		justifyContent: 'center',
		paddingHorizontal: 30,
	},
	header: {
		width: '100%',
		height: 80,
		justifyContent: 'center',
		marginBottom: 30,
	},
	title: {
		fontFamily: fonts.content,
		fontSize: 30,
	},
	subTitle: {
		fontFamily: fonts.heading,
		fontSize: 24,
		color: colors.black,
	},
	textContent: {
		fontSize: 13,
		textAlign: 'center',
		fontFamily: fonts.content,
		color: colors.black,
	},
	heroes: {
		textAlign: 'center',
		fontSize: 30,
	},
	content: {
		backgroundColor: colors.gray_light,
		borderRadius: 10,
		width: '100%',
		height: 100,
		padding: 10,
		marginBottom: 50,
	},
	button: {
		width: 100,
		height: 50,
		backgroundColor: colors.red,
		borderRadius: 7,
		justifyContent: 'center',
	},
	buttonIcon: {
		textAlign: 'center',
		fontSize: 20,
		color: colors.white,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 100,
	},
});
