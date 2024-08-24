import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";

export default function FeaturedCard({
	imgUrl,
	title,
	description,
	rating,
	total_vote,
	releaseDate,
	onPress,
}) {
	return (
		<TouchableOpacity
			className='w-40  mr-2 p-2 items-center rounded-sm bg-[#1F1D36] rounded-xl'
			onPress={onPress}>
			<Image
				className='w-36 h-48 items-center rounded-xl bg-contain'
				source={{ uri: imgUrl }}></Image>
			<View className='w-full pt-4'>
				<View className='flex-column mb-2'>
					<Text className='flex-1 mb-1 text-white text-center font-bold'>
						{title}
					</Text>
				</View>

				<View className='flex-row items-between mb-2'>
					<View className='flex-row flex-1 space-x-1'>
						<StarIcon color='gold' size={16} opacity={1} />
						<Text className='text-white  text-xs'>{rating} </Text>
					</View>
					<Text className='text-cyan-500 text-xs text-center '>
						({releaseDate})
					</Text>
				</View>
				{total_vote > 1 && (
					<Text className='text-cyan-500 text-xs'> ({total_vote} votes)</Text>
				)}
			</View>
		</TouchableOpacity>
	);
}
