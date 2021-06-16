import 'react-native-gesture-handler';
import React from 'react';
import {
	useFonts,
	Raleway_300Light,
	Raleway_400Regular,
	Raleway_500Medium,
} from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';

import { Rotas } from './src/routes/index.routes';

export default function App() {
	let [fontsLoaded] = useFonts({
		Raleway_300Light,
		Raleway_400Regular,
		Raleway_500Medium,
	});

	if (!fontsLoaded) return <AppLoading />;

	return <Rotas />;
}
