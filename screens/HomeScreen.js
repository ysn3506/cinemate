import {
	View,
	Text,
	SafeAreaView,
	Image,
	TextInput,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	XCircleIcon,
	UserCircleIcon,
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
	searchKeyword,
} from "../apis/requests";
import FeaturedScrolls from "../components/FeaturedScrolls";
import TrendScrolls from "../components/TrendScrolls";
import SearchCard from "../components/SearchCard";

export default function HomeScreen() {
	const navigation = useNavigation();
	const [categories, setCategories] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [upComingMovies, setUpComingMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [weeklyTrendMovies, setWeeklyTrendMovies] = useState([]);
	const [textSearchInput, setTextSearchInput] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
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

	const handleSearchInput = (text) => {
		setTextSearchInput(text);
		if (text?.length >= 3 && textSearchInput !== text) {
			if (!isSearching) {
				setIsSearching(true);
			}
			searchKeyword(text).then((resp) => {
				if (resp.length > 0) {
					setSearchResults(resp);
					setIsSearching(false);
				}
			});
		} else {
			setSearchResults([]);
			setIsSearching(false);
		}
	};

	const clearSearchInput = () => {
		if (searchResults.length <= 0) {
			setTextSearchInput("");
			setSearchResults([]);
		}
	};

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
				<TouchableOpacity onPress={() => navigation.navigate("Signup")}>
					<UserCircleIcon size={40} color='#06b6d4' />
				</TouchableOpacity>
			</View>
			<View className='flex-row mx-3 pt-1 pb-3  items-center space-x-2'>
				<View className='flex-row items-center p-3 space-x-2 flex-1 bg-gray-200 rounded-lg'>
					{isSearching ? (
						<ActivityIndicator />
					) : (
						<MagnifyingGlassIcon size={20} color='#06b6d4' />
					)}
					<TextInput
						placeholder='Search movie, genre, tv show'
						keyboardType='default'
						onBlur={clearSearchInput}
						value={textSearchInput}
						onChangeText={(text) => handleSearchInput(text)}></TextInput>
					{textSearchInput && (
						<TouchableOpacity
							onPress={clearSearchInput}
							className='absolute right-2'>
							<XCircleIcon size={25} color='#06b6d4' />
						</TouchableOpacity>
					)}
				</View>
			</View>
			<ScrollView className='mb-30 mx-3'>
				<TrendScrolls data={weeklyTrendMovies} title='Weekly Trends' />
				<FeaturedScrolls data={nowPlayingMovies} title='Now Playing' />
				<FeaturedScrolls data={upComingMovies} title='Upcomings...' />
				<FeaturedScrolls data={topRatedMovies} title='Top Rated Movies' />
				<Categories title='Genres' data={categories} />
			</ScrollView>
			{searchResults.length > 0 && (
				<ScrollView
					className='absolute h-60  w-12/12 z-49 left-6 top-44 bg-white rounded-xl '
					contentContainerStyle={{
						paddingVertical: 15,
					}}>
					{searchResults.map((res) => (
						<SearchCard
							className='relative'
							clickEvent={() => navigation.navigate("MovieDetail", res)}
							key={res.id}
							title={res.title}
							imgUrl={res.image}
							rating={res.rating}
							mediaType={res.mediaType}
							releaseDate={res.releaseDate}
						/>
					))}
				</ScrollView>
			)}
		</SafeAreaView>
	);
}
