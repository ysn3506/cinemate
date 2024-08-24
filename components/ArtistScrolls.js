import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import ArtistCard from "./ArtistCard";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function ArtistScrolls({ title, data }) {
	const navigation = useNavigation();
	const scrollRef = useRef(null);
	useEffect(() => {
		scrollRef.current.scrollTo({ x: 0, y: 0 });
	}, [data]);
	return (
		<View className='pb-2 pt-4'>
			<TouchableOpacity>
				<Text className='font-bold text-xl text-white'>
					{title}
					<ChevronRightIcon className='mr-6 mt-2' size={20} color='#fff' />
				</Text>
			</TouchableOpacity>
			<ScrollView
				ref={scrollRef}
				contentContainerStyle={{
					paddingHorizontal: 0,
					paddingTop: 10,
				}}
				horizontal
				showsHorizontalScrollIndicator={false}>
				{data.map((artist, index) => (
					<ArtistCard
						key={artist.name + index}
						onPress={() => navigation.navigate("ArtistDetail", artist)}
						name={artist.name}
						profile_path={artist.profile_path}
						character={artist.character}
					/>
				))}
			</ScrollView>
		</View>
	);
}
