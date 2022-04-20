import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../component/Pagination/CustomPagination';
import SingleContent from '../../component/SingleContent/SingleContent';
import Genres from '../../component/Genres/Genres'
import useGenre from '../../Hook/useGenre';


const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=e1c683d94e8326b3665c29a99be87366&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreURL}`);
    setContent(data.results);
  }

  useEffect(() => {
    fetchSeries()
  }, [page, genreURL]);

  return (
    <div >
      <span className="pagetitle">Discover New Series</span>

      <Genres
        type="tv"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres} />

      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              type="tv"
              date={c.first_air_date || c.release_date}
              vote={c.vote_average}
            />
          ))
        }
      </div>

      <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Movies