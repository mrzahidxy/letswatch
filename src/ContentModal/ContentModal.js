import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config/config";
import './ContentModal.css'
import { Button } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from './Carousel/Carousel';

export default function ContentModal({ children, id, type }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=e1c683d94e8326b3665c29a99be87366&language=en-US`);
    setContent(data);
  }

  const fetchvideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=e1c683d94e8326b3665c29a99be87366&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchvideo();
  }, [])


  return (
    <div>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        {content && (
          <Box sx={{
            width: "90%",
            height: "80%",
            borderRadius: "10px",
            backgroundColor: "#39445a",
            color: "white",
          }}>
            <div className="ContentModal">

              <img src={
                content.poster_path ?
                  `${img_500}/${content.backdrop_path}`
                  : unavailableLandscape
              }
                alt={content.name || content.movie}
                className='ContentModal_landscape'
              />

              <img src={
                content.poster_path ?
                  `${img_500}/${content.poster_path}`
                  : unavailable
              }
                alt={content.name || content.movie}
                className='ContentModal_potrait'
              />



              <div className="ContentModal_about">
                <span className="ContentModal_title">
                  {content.name || content.title} (
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  )
                </span>
                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}

                <span className="ContentModal_description">
                  {content.overview}
                </span>

                <div>
                  <Carousel type={type} id={id} />
                </div>


                <Button
                  variant="contained"
                  startIcon={<YouTubeIcon />}
                  color="secondary"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  Watch the Trailer
                </Button>
              </div>
            </div>
          </Box>
        )}

      </Modal>
    </div>
  );
}
