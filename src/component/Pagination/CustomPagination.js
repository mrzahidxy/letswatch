import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Pagination from '@mui/material/Pagination';

const CustomPagination = ({ setPage, numOfPages =500}) => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handlePage = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (

    <ThemeProvider theme={darkTheme}>
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10,
    }}>

      <Pagination count={numOfPages}
        onClick={(e) => handlePage(e.target.textContent)}
        color="primary"
        hideNextButton
        hidePrevButton />
    </div>
</ThemeProvider>
  )
}

export default CustomPagination;
