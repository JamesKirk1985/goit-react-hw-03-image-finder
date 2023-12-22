import { Component } from "react"
import { imgGetFunction } from 'Api/Api.js'
import {Button} from '../Button/Button'
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Modal} from '../Modal/Modal'
import { Loader } from "components/Loader/Loader";
import css from "./ImageGallery.module.css"


export class ImageGallery extends Component {

  state = {
    images: null,
    isLoading: true,
    showModal: false,
    searchKey: '',
    page: 1
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevProps !== this.props) {
      this.setState({ searchKey: this.props.searchKey })
    }
    
    if (this.state.searchKey !== prevState.searchKey) {
      this.getImages(this.state.searchKey)
    }
  }

  getImages = async (key) => {
    
    try {
      this.setState({
        isLoading: true,
        page: 1
      })
      const data = await imgGetFunction(key, 1)
      
      this.setState({
        images: data.hits,
        total: data.total,
        totalHits: data.totalHits
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      this.setState({ isLoading: false })
    }

  }

  loadMoreFunc = async () => {
    try {
      this.setState({
        isLoading: true,
        page: this.state.page + 1
      })
      const data = await imgGetFunction(this.state.searchKey, this.state.page + 1)
        this.setState({
        images: [...this.state.images, ...data.hits]
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      this.setState({ isLoading: false })
    }

  }

  showModal = (evt) => { 
        this.setState({
      showModal: true,
          bigImage: evt.target.alt
        }) 
    document.addEventListener('keydown', this.closeModal)
  }

  closeModal = (event) => {  
    if (event.key === 'Escape' || !event.target.closest('IMG')) {
     this.setState({ showModal: false }) 
    }
   
  }



  render() {
    const {images} = this.state
    return (images && <ul className={ css.ImageGallery}>
        {this.state.images.map(({ largeImageURL, id, webformatURL }) => {
          return <ImageGalleryItem
            large={largeImageURL}
            key={id}
            smallImg={webformatURL}
            showModal={this.showModal}/>
        })} 
      {this.state.images.length && this.state.total > this.state.page*12 && <Button loadMoreFunc={this.loadMoreFunc} />}
      {this.state.showModal && <Modal src={this.state.bigImage} close={this.closeModal } />}
      <Loader isLoading={this.state.isLoading} />
        </ul>

    )
  }
}

document.addEventListener('keydown', ImageGallery.closeModal)
