import { View, Text, ScrollView } from "react-native";
import React from "react";
import TrendCard from "./TrendCard";
export default function TrendScrolls({ title, data }) {
	return (
		<View className='w-full pb-2 pt-4'>
			<Text className='font-bold ml-2 text-xl text-white'> {title}</Text>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 0,
					paddingTop: 10,
				}}
				horizontal
				showsHorizontalScrollIndicator={false}>
				{data.map((el) => (
					<TrendCard
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
