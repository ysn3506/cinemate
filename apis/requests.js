import { API_KEY, API_BASE_URL, POSTER_IMG_BASE_URL } from "@env";
import axios from "axios";
import splash from "../assets/favicon.png";

export const getGenres = () =>
	axios
		.get(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
		.then((resp) => resp.data.genres);

export const getGenresWithImages = (genres) =>
	genres.map(async (genre) => {
		const response = await axios.get(
			`${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
		);

		return {
			...genre,
			image: `${POSTER_IMG_BASE_URL}${response.data?.results[1].poster_path}`,
		};
	});

export const getTopRatedMovies = () =>
	axios
		.get(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
		.then((resp) => {
			return resp.data.results;
		})
		.then((resp) =>
			resp.map((movie) => ({
				id: movie.id,
				title: movie.title,
				image: `${POSTER_IMG_BASE_URL}${movie.poster_path}`,
				description: movie.overview,
				rating: movie.vote_average,
				total_vote: movie.vote_count,
				release_date: movie.release_date?.substring(0, 4),
			}))
		);

export const getUpcomingMovies = () =>
	axios
		.get(`${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
		.then((resp) => {
			return resp.data.results;
		})
		.then((resp) =>
			resp.map((movie) => ({
				id: movie.id,
				title: movie.title,
				image: `${POSTER_IMG_BASE_URL}${movie.poster_path}`,
				description: movie.overview,
				rating: movie.vote_average,
				total_vote: movie.vote_count,
				release_date: movie.release_date?.substring(0, 4),
			}))
		);

export const getNowPlayingMovies = () =>
	axios
		.get(`${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
		.then((resp) => {
			return resp.data.results;
		})
		.then((resp) =>
			resp.map((movie) => ({
				id: movie.id,
				title: movie.title,
				image: `${POSTER_IMG_BASE_URL}${movie.poster_path}`,
				description: movie.overview,
				rating: movie.vote_average,
				total_vote: movie.vote_count,
				release_date: movie.release_date?.substring(0, 4),
			}))
		);

export const getWeeklyTrendMovies = () =>
	axios
		.get(`${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
		.then((resp) => {
			return resp.data.results;
		})
		.then((resp) =>
			resp.map((movie) => ({
				id: movie.id,
				title: movie.title,
				image: movie.poster_path
					? `${POSTER_IMG_BASE_URL}${movie.poster_path}`
					: `${POSTER_IMG_BASE_URL}${movie.backdrop_path}`,
				description: movie.overview,
				rating: movie.vote_average,
				total_vote: movie.vote_count,
				release_date: movie.release_date?.substring(0, 4),
			}))
		);

export const searchKeyword = (text) =>
	axios
		.get(`${API_BASE_URL}/search/multi?query=${text}&api_key=${API_KEY}`)
		.then((resp) => {
			return resp.data.results;
		})
		.then((resp) =>
			resp.map((element) => ({
				id: element.id,
				title: element.name || element.title,
				image: element?.poster_path
					? `${POSTER_IMG_BASE_URL}${element?.poster_path}`
					: element?.profile_path
					? `${POSTER_IMG_BASE_URL}${element?.profile_path}`
					: splash,
				mediaType: element.media_type,
				description: element.overview,
				rating: element.vote_average || "",
				total_vote: element.vote_count || "",
				releaseDate:
					element.release_date?.substring(0, 4) ||
					element.first_air_date?.substring(0, 4) ||
					"",
			}))
		);

export const getMovieDetail = (id) =>
	axios
		.get(
			`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
		)
		.then((resp) => resp.data);

export const getSimilarMovies = (id) =>
	axios
		.get(
			`${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&append_to_response=credits`
		)
		.then((resp) => resp.data.results)
		.then((resp) =>
			resp.map((element) => ({
				id: element.id,
				title: element.name || element.title,
				image: element?.poster_path
					? `${POSTER_IMG_BASE_URL}${element?.poster_path}`
					: element?.profile_path
					? `${POSTER_IMG_BASE_URL}${element?.profile_path}`
					: splash,
				mediaType: element.media_type,
				description: element.overview,
				rating: element.vote_average || "",
				total_vote: element.vote_count || "",
				releaseDate:
					element.release_date?.substring(0, 4) ||
					element.first_air_date?.substring(0, 4) ||
					"",
			}))
		);

export const getTrailerUrl = (id) =>
	axios
		.get(`${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
		.then((resp) => resp?.data?.results[0] || "");
