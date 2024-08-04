import { View, Text, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { getGenres, getGenresWithImages } from "../apis/requests";

export default function Categories({ title, data }) {
	return (
		<View>
			<Text className='font-bold ml-2 text-xl text-white'> {title}</Text>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 15,
					paddingTop: 10,
				}}
				horizontal
				showsHorizontalScrollIndicator={false}>
				{data.map((category) => (
					<CategoryCard
						key={category.id}
						title={category.name}
						imgUrl={category.image}
					/>
				))}
			</ScrollView>
		</View>
	);
}
