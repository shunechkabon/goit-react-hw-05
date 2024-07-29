import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWIwNDY4MGI3ODk5MGE0ZGU1NmEzZTYxZGFmMDIwNyIsIm5iZiI6MTcyMjExNzQzMy41NTg5MDEsInN1YiI6IjY2YTU2YmUyZDFmMGI5MTdkNjYwMDkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BF6ClvONJvihNKySStftL3QBXuEJPbY4fbdGdTlhPyU'
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    const goBack = () => {
        const backLocation = location.state?.from;
        navigate(`${backLocation.pathname}${backLocation.search}`);
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    const releaseYear = new Date(movie.release_date).getFullYear();
    const userScore = Math.round(movie.vote_average * 10);
    const genres = movie.genres.map(genre => genre.name).join(', ');

    return (
        <div className={s.movieDetailsPage}>
            <button onClick={goBack}>Go back</button>
            <div className={s.movieDetails}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                <div>
                    <h1>{movie.title} ({releaseYear})</h1>
                    <p>User Score: {userScore}%</p>
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                    <h2>Genres</h2>
                    <p>{genres}</p>
                </div>
            </div>
            <h2>Additional information</h2>
            <div className={s.addInfo}>
                <Link to="cast">Cast</Link>
                <Link to="reviews">Reviews</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;