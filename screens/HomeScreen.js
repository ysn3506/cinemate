import {
	View,
	Text,
	SafeAreaView,
	Image,
	TextInput,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	ChevronDownIcon,
	UserCircleIcon,
	AdjustmentsVerticalIcon,
	MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import {
	getGenres,
	getGenresWithImages,
	getNowPlayingMovies,
	getTopRatedMovies,
	getUpcomingMovies,
	getWeeklyTrendMovies,
} from "../apis/requests";
import FeaturedScrolls from "../components/FeaturedScrolls";
import TrendScrolls from "../components/TrendScrolls";

export default function HomeScreen() {
	const navigation = useNavigation();
	const [categories, setCategories] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [upComingMovies, setUpComingMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [weeklyTrendMovies, setWeeklyTrendMovies] = useState([]);
	useEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
		getTopRatedMovies().then((resp) => setTopRatedMovies(resp));
		getUpcomingMovies().then((resp) => setUpComingMovies(resp));
		getNowPlayingMovies().then((resp) => setNowPlayingMovies(resp));
		getGenres().then((resp) =>
			Promise.all(getGenresWithImages(resp)).then((resp) => setCategories(resp))
		);
		getWeeklyTrendMovies().then((resp) => setWeeklyTrendMovies(resp));
	}, []);

	return (
		<SafeAreaView className='bg-[#070F2B]'>
			<View className='flex-row pt-3 pb-3 items-center mx-3 space-x-2'>
				<Image
					source={{ uri: "https://picsum.photos/200/300" }}
					className='h-7 w-7 bg-gray-300 p-4 rounded-full'
				/>
				<View className='flex-1'>
					<Text className='text-cyan-500 text-xs'>Welcome Cinephile!</Text>
				</View>
				<UserCircleIcon size={40} color='#06b6d4' />
			</View>
			<View className='flex-row mx-3 pt-1 pb-3  items-center space-x-2'>
				<View className='flex-row items-center p-3 space-x-2 flex-1 bg-gray-200 rounded-lg'>
					<MagnifyingGlassIcon size={20} color='#06b6d4' />
					<TextInput
						placeholder='Search movie, genre, tv show'
						keyboardType='default'></TextInput>
				</View>
				<AdjustmentsVerticalIcon size={25} color='#06b6d4' />
			</View>

			<ScrollView className='mb-48'>
				<TrendScrolls data={weeklyTrendMovies} title='Weekly Trends' />
				<FeaturedScrolls data={nowPlayingMovies} title='Now Playing' />
				<FeaturedScrolls data={upComingMovies} title='Upcomings...' />
				<FeaturedScrolls data={topRatedMovies} title='Top Rated Movies' />
				<Categories title='Genres' data={categories} />
			</ScrollView>
		</SafeAreaView>
	);
}
