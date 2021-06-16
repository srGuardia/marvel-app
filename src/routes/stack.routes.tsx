import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../styles/colors';
import { WelcomeContainer } from '../containers/Welcome';
import { ListHeroesContainer } from '../containers/Heroes/ListHeroes';

const RotasStack = createStackNavigator();

export const AppRouteStack: FC = () => (
	<RotasStack.Navigator
		headerMode='none'
		screenOptions={{ cardStyle: { backgroundColor: colors.red } }}
	>
		<RotasStack.Screen name='Welcome' component={WelcomeContainer} />
		<RotasStack.Screen name='ListHeroes' component={ListHeroesContainer} />
	</RotasStack.Navigator>
);
