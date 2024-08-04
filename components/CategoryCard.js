import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function CategoryCard({ imgUrl, title }) {
	return (
		<TouchableOpacity className='relative mr-2 items-center rounded-sm'>
			<Image
				source={{ uri: imgUrl }}
				className='h-48 w-36 bg-gray rounded-sm'
			/>

			<Text className=' absolute left-0 bottom-4 w-full mt-2 text-center text-white font-bold z-50 text-l'>
				{title}
			</Text>
			<View className='absolute left-0 bottom-0 w-full h-full bg-black z-20 opacity-75 rounded-sm'></View>
		</TouchableOpacity>
	);
}
