import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import s from './MoviesPage.module.css';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const savedQuery = queryParams.get('query');

        if (savedQuery) {
            setQuery(savedQuery);
            fetchMovies(savedQuery);
        }
    }, [location.search]);

    const fetchMovies = async (query) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            setMovies(response.data.results);
            navigate(`/movies?query=${query}`, { replace: true });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            fetchMovies(query);
        }
    };

    return (
        <div className={s.moviesPage}>
            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for movies..."/>
                <button type="submit">Search</button>
            </form>
            <MovieList movies={movies}/>
        </div>
    );
};

export default MoviesPage;