import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from './MovieCast.module.css';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchCast = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            setCast(response.data.cast);
        };
        fetchCast();
    }, [movieId]);

    return (
        <ul>
            {cast.map(member => (
                <li key={member.cast_id} className={s.castItem}>
                    {member.profile_path ? (
                        <img
                            src={`${IMAGE_BASE_URL}${member.profile_path}`}
                            alt={member.name}
                            className={s.castImage}
                        />
                    ) : (
                        <div>No Image</div>
                    )}
                    <p><strong>{member.name}</strong></p>
                    <p>{member.character}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieCast;