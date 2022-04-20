import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({ genres, setGenres, type,
    selectedGenres, setSelectedGenres, setPage }) => {

    const genresAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id))
    }

    const genresRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres, genre]);
    }


    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=e1c683d94e8326b3665c29a99be87366&language=en-US`);
        setGenres(data.genres);

    }

    useEffect(() => {
        fetchGenres();
    }, [])


    return (

        <div style={{ padding: '6px 0' }}>
            {selectedGenres.map((genre) =>
            (<Chip
                key={genre.id}
                label={genre.name}
                style={{ margin: "2px" }}
                color="primary"
                clickable
                onDelete={() => genresRemove(genre)}
            />))}

            {genres.map((genre) =>
            (<Chip
                key={genre.id}
                label={genre.name}
                style={{ margin: "2px", color: "white" }}
                clickable
                onClick={() => genresAdd(genre)}
            />))}
        </div>

    );
}

export default Genres;