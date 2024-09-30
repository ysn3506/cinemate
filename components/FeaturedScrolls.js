import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import FeaturedCard from "./FeaturedCard";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function FeaturedScrolls({ title, data }) {
	const navigation = useNavigation();

	const scrollRef = useRef(null);
	useEffect(() => {
		scrollRef.current.scrollTo({ x: 0, y: 0 });
	}, [data]);

	return (
		<View className='pb-2'>
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
				{data.map((el) => (
					<FeaturedCard
						key={el.id}
						onPress={() => navigation.navigate("MovieDetail", el)}
						title={el.title}
						rating={el?.rating?.toFixed ? `${el?.rating?.toFixed(2)} / 10` : ""}
						total_vote={el.total_vote}
						imgUrl={el.image}
						description={el.description}
						releaseDate={el.release_date || el.releaseDate}
					/>
				))}
			</ScrollView>
		</View>
	);
}
