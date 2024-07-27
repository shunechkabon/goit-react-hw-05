import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import s from './MoviesPage.module.css';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWIwNDY4MGI3ODk5MGE0ZGU1NmEzZTYxZGFmMDIwNyIsIm5iZiI6MTcyMjExNzQzMy41NTg5MDEsInN1YiI6IjY2YTU2YmUyZDFmMGI5MTdkNjYwMDkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BF6ClvONJvihNKySStftL3QBXuEJPbY4fbdGdTlhPyU'
            }
    });
        setMovies(response.data.results);
    };

    return (
        <div className={s.moviesPage}>
            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;