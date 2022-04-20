import { img_300, unavailable } from '../../config/config';
import Badge from '@mui/material/Badge';
import './SingleContent.css';
import ContentModal from '../../ContentModal/ContentModal'


const SingleContent = ({
  id, poster, title, date, vote, type }) => {



  return (
    <ContentModal id= {id} type={type}>
      <Badge
        badgeContent={vote}
        color={vote > 6 ? 'primary' : 'secondary'}
      />
      <img
        className='poster'
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title} 
        />
      <b className='title'> {title} </b>
      <span className="subtitle">
        {type === 'tv' ? "TV Series" : "Movie"}
        <span className='subTitle'>{date}</span>
      </span>
    </ContentModal>
  )
}

export default SingleContent;