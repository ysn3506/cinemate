import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";

export default function SearchCard({
	imgUrl,
	title,
	mediaType,
	releaseDate,
	rating,
	clickEvent,
}) {
	const contentType =
		mediaType === "person"
			? "Artist"
			: mediaType === "tv"
			? "TV Show"
			: "Movie";

	return (
		<TouchableOpacity
			className='h-16 w-96 flex-row  bg-yellow border-1-black mb-5 rounded-xl p-2 items-center space-x-1 '
			onPress={() => clickEvent()}>
			<Image className='w-16 h-16 mr-4 bg-black' source={{ uri: imgUrl }} />
			<View className='h-16'>
				<View className='mb-1 space-y-1 '>
					<Text className='font-bold text-12'>{title}</Text>
					<Text className='text-[#06b6d4] '>{contentType}</Text>
				</View>
				<View className='mb-1 w-full space-x-1 flex-row justify-around'>
					<View className='flex-row flex-1 space-x-1 items-center'>
						{rating && <StarIcon color='gold' size={18} opacity={1} />}
						{rating && <Text className=' text-sm '>{rating.toFixed(2)}</Text>}
					</View>

					<Text className='text-[#06b6d4] font-bold text-sm '>
						{releaseDate}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
