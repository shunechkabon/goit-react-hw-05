import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            setMovies(response.data.results);
    };
        fetchTrendingMovies();
    }, []);

    return (
        <div style={{ paddingLeft: '50px' } }>
            <h1>Trending today</h1>
            <MovieList movies={movies} />
        </div>
    );
};

export default HomePage;