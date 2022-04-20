import Box from '@mui/material/Box';
import {BottomNavigation, BottomNavigationAction, createTheme} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';

export default function MainNav() {
  const [value, setValue] = useState(0);
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    if (value === 0) {
      history.push("/");
    } else if (value === 1) {
      history.push("/movies");
    } else if (value === 2) {
      history.push("/series");
    } else if (value === 3) {
      history.push("/search");
    }
  }, [value, history]);

  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={ {
      width: "100%",
      position: "fixed",
      bottom: 0,
      backgroundColor: "#2d313a",
      zIndex: 100,
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Tending" icon={<WhatshotOutlinedIcon />}/>
        <BottomNavigationAction label="Movies" icon={<MovieOutlinedIcon />}/>
        <BottomNavigationAction label="Series" icon={<TvOutlinedIcon />}/>
        <BottomNavigationAction label="Search" icon={<SearchOutlinedIcon />} />
      </BottomNavigation>
    </Box>
</ThemeProvider>
  );
}
