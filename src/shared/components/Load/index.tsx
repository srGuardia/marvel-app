import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import load from '../../../assets/loading.json';

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
	},
	animation: {
		backgroundColor: 'transparent',
		width: 200,
		height: 200,
	},
});
