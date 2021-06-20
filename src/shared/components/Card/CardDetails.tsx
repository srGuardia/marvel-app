import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import { randomColor } from '../../utils/utils';

interface CardProps {
	data: {
		id: string;
		title: string;
		thumbnail: {
			extension: string;
			path: string;
		};
	};
}

export const CardDetails = ({
	data: { id, title, thumbnail },
	...rest
}: CardProps) => (
	<View key={id} style={styles.container} {...rest}>
		<Image
			source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }}
			style={styles.image}
		/>
		<Text style={styles.textName}>{title}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 200,
		height: 200,
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
