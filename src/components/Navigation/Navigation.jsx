import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => (
    <nav className={s.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
    </nav>
);

export default Navigation;