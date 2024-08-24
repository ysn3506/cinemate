import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function TrendCard({ imgUrl, title, description }) {
	return (
		<View className='w-screen mr-2 p-2 items-center relative  bg-[#1F1D36] rounded-xl'>
			<Image
				className='w-full h-80 items-center relative rounded-xl bg-contain'
				source={{ uri: imgUrl }}></Image>
			<View className='absolute  w-full  h-80 mt-2 bg-black z-20 opacity-75 rounded-xl'></View>
			<Text className=' absolute inset-y-1/3 w-full text-center text-white font-bold z-50 text-xl'>
				{title}
			</Text>
			<Text className=' absolute  bottom-4 w-full h-24 p-4  text-white tracking-wide font-bold z-50 text-l'>
				{description}
			</Text>
		</View>
	);
}
