import { Button, TextField, Tabs, Tab, createTheme } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleContent from '../../component/SingleContent/SingleContent';
import CustomPagination from '../../component/Pagination/CustomPagination'

const Search = () => {
  const [type, setType] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=e1c683d94e8326b3665c29a99be87366&language=en-US&query=${search}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [type, page])

  console.log(search)
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex" }}>
          <TextField
            style={{ flex: 1 }}
            label="Search"
            variant='filled'
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant='contained'
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchOutlinedIcon fontSize='large' />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}

        >
          <Tab style={{ width: '50%' }} label='Search Movies' />
          <Tab style={{ width: '50%' }} label='Search Tv Series' />
        </Tabs>
      </ThemeProvider>

      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleContent 
              key={c.id}
              id ={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              type={type ? "tv" : "movie"}
              date={c.first_air_date || c.release_date}
              vote={c.vote_average}
            />
          ))
        }
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />)
      }
    </div>
  )
}

export default Search;