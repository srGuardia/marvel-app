import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import load from '../../../assets/loading.json';
import colors from '../../../../styles/colors';

export const Load: FC = () => (
	<SafeAreaView style={styles.container}>
		<LottieView source={load} autoPlay loop style={styles.animation} />
	</SafeAreaView>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.red,
	},
	animation: {
		width: 200,
		height: 200,
	},
});
