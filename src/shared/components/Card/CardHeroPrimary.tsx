import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import { randomColor } from '../../utils/utils';

interface CardProps extends RectButtonProps {
	data: {
		name: string;
		thumbnail: {
			extension: string;
			path: string;
		};
	};
}

export const CardHeroPrimary = ({
	data: { name, thumbnail },
	...rest
}: CardProps) => (
	<RectButton style={styles.container} {...rest}>
		<Image
			source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }}
			style={styles.image}
		/>
		<Text style={styles.textName}>{name}</Text>
	</RectButton>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		maxWidth: '50%',
		backgroundColor: colors.gray_light,
		paddingVertical: 10,
		alignItems: 'center',
		margin: 10,
		borderRadius: 10,
	},
	textName: {
		marginTop: 10,
		fontFamily: fonts.heading,
		color: colors.black,
		fontSize: 12,
		textAlign: 'center',
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderColor: randomColor(),
		borderWidth: 3,
	},
});
