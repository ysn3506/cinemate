import { View, Text, TouchableOpacity, Image } from "react-native";
import { POSTER_IMG_BASE_URL } from "@env";
import React from "react";

export default function ArtistCard({ name, profile_path, character, onPress }) {
	return (
		<TouchableOpacity className='w-32 h-content mr-2 '>
			<Image
				className='w-32 h-48 mb-2 bg-black'
				source={{ uri: `${POSTER_IMG_BASE_URL}${profile_path}` }}
			/>
			<Text className='text-white text-center'>{name}</Text>
			<Text className='text-white text-center text-s italic'>
				({character})
			</Text>
		</TouchableOpacity>
	);
}
