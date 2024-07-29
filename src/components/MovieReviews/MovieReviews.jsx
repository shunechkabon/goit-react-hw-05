import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            setReviews(response.data.results);
        };
        fetchReviews();
    }, [movieId]);

    return (
        <div>
            {reviews.length > 0 ? (
                <ul className={s.reviewsList}>
                    {reviews.map(review => (
                        <li key={review.id} className={s.reviewItem}>
                            <p><strong>{review.author}</strong></p>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don't have any reviews for this movie</p>
            )}
        </div>
    );
};

export default MovieReviews;