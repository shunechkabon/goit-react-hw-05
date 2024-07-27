import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWIwNDY4MGI3ODk5MGE0ZGU1NmEzZTYxZGFmMDIwNyIsIm5iZiI6MTcyMjExNzQzMy41NTg5MDEsInN1YiI6IjY2YTU2YmUyZDFmMGI5MTdkNjYwMDkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BF6ClvONJvihNKySStftL3QBXuEJPbY4fbdGdTlhPyU'
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