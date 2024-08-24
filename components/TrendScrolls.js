import {
	View,
	Text,
	ScrollView,
	useWindowDimensions,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import TrendCard from "./TrendCard";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function TrendScrolls({ title, data }) {
	const { width } = useWindowDimensions();
	const sliderRef = useRef(null);
	const navigation = useNavigation();
	const currentSlideRef = useRef(0);
	useEffect(() => {
		setInterval(() => {
			scrollScrollView();
		}, 3000);

		return clearInterval();
	}, [data.length]);

	const scrollScrollView = () => {
		const coordinate = (width + 8) * currentSlideRef.current;
		sliderRef.current?.scrollTo({
			x: coordinate,
			y: 0,
			animated: true,
		});
		currentSlideRef.current === data.length - 1
			? (currentSlideRef.current = 0)
			: (currentSlideRef.current = currentSlideRef.current + 1);
	};
	return (
		<View className='w-full pb-2 pt-4'>
			<TouchableOpacity>
				<Text className='font-bold ml-2 text-xl text-white items-center'>
					{title}
					<ChevronRightIcon className='mr-6 mt-2' size={20} color='#fff' />
				</Text>
			</TouchableOpacity>
			<ScrollView
				ref={sliderRef}
				// pagingEnabled={true}
				contentContainerStyle={{
					paddingHorizontal: 0,
					paddingTop: 10,
				}}
				horizontal
				showsHorizontalScrollIndicator={false}>
				{data.map((el) => (
					<TouchableOpacity
						key={el.id}
						onPress={() => navigation.navigate("MovieDetail", el)}>
						<TrendCard
							title={el.title}
							rating={`${el.rating.toFixed(2)} / 10`}
							total_vote={el.total_vote}
							imgUrl={el.image}
							description={el.description}
							releaseDate={el.release_date}
						/>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}
