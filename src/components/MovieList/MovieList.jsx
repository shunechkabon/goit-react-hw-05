import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
    const location = useLocation();

    return (
        <ul className={s.movieList}>
            {movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`} state={{ from: { pathname: location.pathname, search: location.search } }}>
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;