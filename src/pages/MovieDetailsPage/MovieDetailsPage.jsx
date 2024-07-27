import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWIwNDY4MGI3ODk5MGE0ZGU1NmEzZTYxZGFmMDIwNyIsIm5iZiI6MTcyMjExNzQzMy41NTg5MDEsInN1YiI6IjY2YTU2YmUyZDFmMGI5MTdkNjYwMDkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BF6ClvONJvihNKySStftL3QBXuEJPbY4fbdGdTlhPyU'
                }
            });
            setMovie(response.data);
        };
        fetchMovieDetails();
    }, [movieId]);

    const goBack = () => {
        navigate(location.state?.from ?? '/movies');
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={goBack}>Go back</button>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;