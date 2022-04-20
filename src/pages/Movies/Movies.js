import axios from 'axios';
import { useEffect, useState } from 'react'
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

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
    setContent(data.results);
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies()
  }, [page, genreURL]);

  return (
    <div >
      <span className="pagetitle"> Discover New Movies</span>

      <Genres
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage} />

      <div className='trending'>
        {content
          && content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              type="movie"
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