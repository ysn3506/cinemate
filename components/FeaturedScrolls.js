import { View, Text, ScrollView } from "react-native";
import React from "react";
import FeaturedCard from "./FeaturedCard";

export default function FeaturedScrolls({ title, data }) {
	return (
		<View className='pb-2 pt-4'>
			<Text className='font-bold ml-2 text-xl text-white'> {title}</Text>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 15,
					paddingTop: 10,
				}}
				horizontal
				showsHorizontalScrollIndicator={false}>
				{data.map((el) => (
					<FeaturedCard
						key={el.id}
						title={el.title}
						rating={`${el.rating.toFixed(2)} / 10`}
						total_vote={el.total_vote}
						imgUrl={el.image}
						description={el.description}
						releaseDate={el.release_date}
					/>
				))}
			</ScrollView>
		</View>
	);
}
