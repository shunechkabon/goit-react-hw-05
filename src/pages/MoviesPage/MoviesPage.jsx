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
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWIwNDY4MGI3ODk5MGE0ZGU1NmEzZTYxZGFmMDIwNyIsIm5iZiI6MTcyMjExNzQzMy41NTg5MDEsInN1YiI6IjY2YTU2YmUyZDFmMGI5MTdkNjYwMDkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BF6ClvONJvihNKySStftL3QBXuEJPbY4fbdGdTlhPyU'
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
    
    // const [query, setQuery] = useState(localStorage.getItem('query') || '');
    // const [movies, setMovies] = useState([]);

    // const handleSearch = async (e) => {
    //     e.preventDefault(); 
    //     if (!query.trim()) return;

    //     localStorage.setItem('query', query);

    //     try {
    //         const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
    //             headers: {
    //                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWIwNDY4MGI3ODk5MGE0ZGU1NmEzZTYxZGFmMDIwNyIsIm5iZiI6MTcyMjExNzQzMy41NTg5MDEsInN1YiI6IjY2YTU2YmUyZDFmMGI5MTdkNjYwMDkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BF6ClvONJvihNKySStftL3QBXuEJPbY4fbdGdTlhPyU' 
    //             }
    //         });
    //         setMovies(response.data.results);
    //     } catch (error) {
    //         console.error('Error fetching movies:', error);
    //     }
    // };

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