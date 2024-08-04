import { API_KEY, API_BASE_URL, POSTER_IMG_BASE_URL } from "@env";
import axios from "axios";

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
				image: `${POSTER_IMG_BASE_URL}${movie.backdrop_path}`,
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
				image: `${POSTER_IMG_BASE_URL}${movie.backdrop_path}`,
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
				image: `${POSTER_IMG_BASE_URL}${movie.backdrop_path}`,
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
				image: `${POSTER_IMG_BASE_URL}${movie.backdrop_path}`,
				description: movie.overview,
				rating: movie.vote_average,
				total_vote: movie.vote_count,
				release_date: movie.release_date?.substring(0, 4),
			}))
		);
