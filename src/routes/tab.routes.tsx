import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import { ListHeroesContainer } from '../containers/Heroes/ListHeroes';
import colors from '../../styles/colors';
import { HeroFavoriteContainer } from '../containers/Heroes/HeroFavorite';

const RotasTab = createBottomTabNavigator();

export const AppRouteTab: FC = () => (
	<RotasTab.Navigator
		tabBarOptions={{
			activeTintColor: colors.red,
			inactiveTintColor: colors.gray,
			labelPosition: 'below-icon',
			style: {
				height: 60,
			},
		}}
	>
		<RotasTab.Screen
			name='Heros'
			component={ListHeroesContainer}
			options={{
				tabBarIcon: ({ size, color }) => (
					<AntDesign name='user' size={size} color={color} />
				),
			}}
		/>

		<RotasTab.Screen
			name='Favorites'
			component={HeroFavoriteContainer}
			options={{
				tabBarIcon: ({ size, color }) => (
					<AntDesign name='star' size={size} color={color} />
				),
			}}
		/>
	</RotasTab.Navigator>
);
