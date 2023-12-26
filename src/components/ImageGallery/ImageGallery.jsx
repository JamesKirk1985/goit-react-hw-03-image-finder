import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css"
import {nanoid} from 'nanoid' 

export const ImageGallery = ({images, showModal}) => {   
 
    return (images && <ul className={ css.ImageGallery}>
        {images.map(({ largeImageURL, id, webformatURL }) => {
          return <ImageGalleryItem
            large={largeImageURL}
            key={nanoid()}
            smallImg={webformatURL}
            showModal={showModal}/>
        })}       
        </ul>
    )
  }



