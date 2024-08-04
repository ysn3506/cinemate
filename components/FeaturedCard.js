import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon, PlusIcon } from "react-native-heroicons/solid";

export default function FeaturedCard({
	imgUrl,
	title,
	description,
	rating,
	total_vote,
	releaseDate,
}) {
	return (
		<TouchableOpacity className='w-48  mr-2 p-2 items-center rounded-sm bg-[#1F1D36] rounded-xl'>
			<Image
				className='w-44 h-64 items-center rounded-xl bg-contain'
				source={{ uri: imgUrl }}></Image>
			<View className='w-full pt-2'>
				<View className='flex-row   space-x-1'>
					<Text className='flex-1 h-12 text-white font-bold'>{title}</Text>
					<Text className='text-cyan-500 '>({releaseDate})</Text>
				</View>

				<View className='flex-row items-center space-x-1'>
					<StarIcon color='gold' size={22} opacity={1} />
					<Text className='text-white'>{rating} </Text>
					<Text className='text-cyan-500 text-xs'> ({total_vote} votes)</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
