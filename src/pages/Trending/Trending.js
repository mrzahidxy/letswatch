import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../component/Pagination/CustomPagination';
import SingleContent from '../../component/SingleContent/SingleContent';
import './Trending.css'



const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=e1c683d94e8326b3665c29a99be87366&page=${page}`);
    setContent(data.results);
    setNumOfPages(data.total_pages);
    console.log(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending()
  }, [page]);

  return (
    <div >
     <span className="pagetitle">Trending</span>

      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleContent 
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              type={c.media_type}
              date={c.first_air_date || c.release_date}
              vote={c.vote_average}
            />
          ))
        }
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Trending;