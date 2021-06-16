import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRouteStack } from './stack.routes';

export const Rotas: FC = () => (
	<NavigationContainer>
		<AppRouteStack />
	</NavigationContainer>
);
