import css from "./ImageGalleryItem.module.css"
export const ImageGalleryItem = ({ smallImg, large, showModal }) => {
  return (<li >
    <img className={css.ImageGalleryItemImage}
      src={smallImg}
      alt={large}
      onClick={showModal}
    />
</li>)
}

