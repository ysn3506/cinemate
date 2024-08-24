import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	Linking,
	Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
	PlayCircleIcon,
	ShareIcon,
	HeartIcon,
	ListBulletIcon,
	UserGroupIcon,
	ChatBubbleLeftEllipsisIcon,
	ClipboardDocumentListIcon,
} from "react-native-heroicons/solid";
import { StarIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
	getMovieDetail,
	getSimilarMovies,
	getTrailerUrl,
} from "../apis/requests";
import FeaturedScrolls from "../components/FeaturedScrolls";
import { POSTER_IMG_BASE_URL, YOUTUBE_TRAILER_BASE_URL } from "@env";
import ArtistScrolls from "../components/ArtistScrolls";

export default function MovieDetail() {
	const navigation = useNavigation();
	const {
		params: { id, title, image, description, rating, total_vote, release_date },
	} = useRoute();
	const [director, setDirector] = useState({});
	const [cast, setCast] = useState([]);
	const [movieDetail, setMovieDetail] = useState({});
	const [similarMovies, setSimilarMovies] = useState([]);
	const [poster, setPoster] = useState(image);
	const [trailerUrl, setTrailerUrl] = useState("");
	const scrollRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: title,
			headerStyle: {
				backgroundColor: "#070F2B",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		});
		scrollRef.current.scrollTo({ x: 0, y: 0 });
		getSimilarMovies(id).then((resp) => {
			setSimilarMovies(resp);
		});
		getTrailerUrl(id).then((resp) => {
			setTrailerUrl(resp.key);
		});
		setIsLoading(true);
		getMovieDetail(id)
			.then((resp) => {
				const directorInfo = resp?.credits?.crew?.filter(
					(el) => el.job === "Director"
				);
				setDirector(directorInfo[0]);
				setCast(resp?.credits?.cast);
				setPoster(`${POSTER_IMG_BASE_URL}${resp.poster_path}`);
				setMovieDetail({
					...movieDetail,
					genres: resp?.genres,
					tagline: resp?.tagline,
					release_date: convertDateToReadableDate(resp?.release_date),
					country: resp?.origin_country[0].toUpperCase(),
					runtime: convertDurationToReadibleTime(resp?.runtime),
					budget: resp?.budget ? convertBudgetToReadbleBudget(resp?.budget) : 0,
				});
			})
			.then(() => setIsLoading(false));
	}, [id]);

	const convertDateToReadableDate = (date) =>
		date.split("-").reverse().join(".");

	const convertBudgetToReadbleBudget = (amount) => {
		if (amount >= 1000000) {
			const readableAmount =
				amount % 1000000 === 0
					? (amount / 1000000).toFixed(0)
					: (amount / 1000000).toFixed(2);
			return "$" + readableAmount + "M";
		}
		if (amount >= 100000 && amount < 1000000) {
			return "$" + (amount / 100).toFixed(2) + "K";
		} else {
			return "$" + amount;
		}
	};

	const convertDurationToReadibleTime = (time) => {
		if (time < 60) {
			return time + "minutes";
		} else {
			const hour = (time / 60).toFixed(0);
			const minute = time % 60;

			additional_hour_word = hour > 1 ? "hours" : "hour";
			additional_minute_word = minute > 1 ? "minutes" : "minute";
			return `${hour}${additional_hour_word}  ${minute}${additional_minute_word}`;
		}
	};

	const redirectToTrailer = () =>
		Linking.openURL(YOUTUBE_TRAILER_BASE_URL + trailerUrl).catch((error) =>
			Alert.alert("Error", error, [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			])
		);

	return (
		<SafeAreaView className='bg-[#070F2B]'>
			{isLoading && (
				<View className='absolute w-screen h-screen z-50 bg-[#070F2B95] justify-center align-center'>
					<ActivityIndicator size='large' color='white' />
				</View>
			)}

			<View className='p-2 relative flex-row w-screen h-64 mb-6 mt-4 items-center'>
				<View className='w-2/5 h-64 bg-black'>
					<Image
						className='w-full h-64 bg-cover bg-[#070F2B95] '
						source={{ uri: poster }}
					/>
					{trailerUrl && (
						<TouchableOpacity
							className='absolute right-2 bg-[#000000A6] bottom-2 border-2 border-solid rounded-xl border-[#D4AF37] p-2 flex-row space-x-1 justify-center items-center'
							onPress={redirectToTrailer}>
							<PlayCircleIcon color='#D4AF37' size={22} />
							<Text className='text-sm text-white'>Trailer</Text>
						</TouchableOpacity>
					)}
				</View>

				<View className='h-80 px-5  py-10 w-3/5  items-start space-y-3'>
					{rating && total_vote && (
						<View className='flex-row  space-x-1 items-start w-auto'>
							<Text className='text-white  text-s italic '>Rating:</Text>
							{rating?.toFixed && (
								<Text className='text-white text-s '>
									{rating?.toFixed(2) || ""}
								</Text>
							)}
							<Text className='text-white  text-s'>({total_vote} votes) </Text>
						</View>
					)}
					<View className='flex-row  space-x-1 items-start w-auto'>
						<Text className='text-white  text-s italic '>Release Year:</Text>
						<Text className='text-white  text-s'>
							{movieDetail.release_date}
						</Text>
					</View>
					{movieDetail.budget && (
						<View className='flex-row  space-x-1 items-start w-auto'>
							<Text className='text-white  text-s italic '>Budget:</Text>
							<Text className='text-white  text-s'>{movieDetail.budget}</Text>
						</View>
					)}
					<View className='flex-row  space-x-1 items-start w-auto'>
						<Text className='text-white  text-s italic '>Runtime:</Text>
						<Text className='text-white  text-s'>{movieDetail.runtime}</Text>
					</View>
					{director?.name && (
						<View className='flex-row  flex-wrap space-x-1 items-start w-full'>
							<Text className='text-white  text-s italic '>Directed by:</Text>
							<Text className='text-white  text-s'>{director?.name}</Text>
						</View>
					)}
					{movieDetail.country && (
						<View className='flex-row  flex-wrap space-x-1 items-start w-full'>
							<Text className='text-white  text-s italic '>
								Origin Country:
							</Text>
							<Text className='text-white  text-s'>{movieDetail.country}</Text>
						</View>
					)}
					<View className='absolute bottom-8 left-2 flex-row w-full  space-x-3 items-center justify-center'>
						<TouchableOpacity className='bg-pink-800 rounded-lg py-2 px-4 flex-row  justify-left items-center '>
							<HeartIcon size={22} color='white' />
						</TouchableOpacity>
						<TouchableOpacity className='bg-sky-500 rounded-lg py-2 px-4  flex-row  justify-left items-center '>
							<ListBulletIcon size={22} color='white' />
						</TouchableOpacity>

						<TouchableOpacity className='bg-lime-500 rounded-lg py-2 px-4 flex-row  justify-left items-center '>
							<ShareIcon size={22} color='white' />
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View className='pb-40'>
				<ScrollView
					ref={scrollRef}
					className='p-4 '
					contentContainerStyle={{
						paddingBottom: 400,
					}}>
					<View className='flex-column space-y-3 mb-4'>
						<View className='flex-row space-x-4 justify-start items-center'>
							<Text className='text-2xl text-white font-bold align-center'>
								{title}
							</Text>
						</View>

						{movieDetail.tagline && (
							<Text className='text-white font-bold italic'>
								{movieDetail.tagline}
							</Text>
						)}
						{movieDetail?.genres && (
							<View className='flex-row w-full h-content flex-wrap justify-start gap-2'>
								{movieDetail?.genres?.map((genre) => (
									<View
										className='w-content h-content p-2 border border-white border-solid rounded-lg'
										key={genre.id}>
										<Text className='italic text-white'> {genre.name}</Text>
									</View>
								))}
							</View>
						)}
						<Text className='text-white'>{description}</Text>
					</View>
					<View className='flex-row w-full h-20 justify-center items-center space-x-2'>
						<TouchableOpacity className='w-4/12 bg-pink-800 h-20 rounded-lg p-2 justify-center items-center'>
							<UserGroupIcon size={35} color='white' />
							<Text className='text-lg text-white text-bold'>Fans</Text>
						</TouchableOpacity>
						<TouchableOpacity className='w-4/12 bg-sky-500 h-20 rounded-lg p-4 justify-center items-center'>
							<ClipboardDocumentListIcon size={35} color='white' />
							<Text className='text-lg text-white text-bold'>Lists</Text>
						</TouchableOpacity>
						<TouchableOpacity className='w-4/12 bg-slate-400 h-20 rounded-lg p-4 justify-center items-center'>
							<ChatBubbleLeftEllipsisIcon size={35} color='white' />
							<Text className='text-lg text-white text-bold'>Reviews</Text>
						</TouchableOpacity>
					</View>

					{cast && (
						<View>
							<ArtistScrolls title='Cast' data={cast} />
						</View>
					)}

					{similarMovies && (
						<View>
							<FeaturedScrolls title='Similar Movies' data={similarMovies} />
						</View>
					)}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
