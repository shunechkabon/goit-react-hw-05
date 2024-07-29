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
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`
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
        const backLocation = location.state?.from ?? '/';
        navigate(backLocation); // Повертаємось на попередню сторінку
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
                <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : defaultImg} width={250} alt={movie.title} />
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
                <Link to="cast" state={{ from: location.state?.from }}>Cast</Link>
                <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;