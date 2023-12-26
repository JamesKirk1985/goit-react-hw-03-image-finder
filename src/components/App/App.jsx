import { Component } from "react";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { SearchBar } from "../SearchBar/SearchBar";
import { Modal } from '../Modal/Modal'
import { Loader } from "../Loader/Loader";
import { Button } from '../Button/Button'

import { imgGetFunction } from 'Api/Api.js'

import css from "./App.module.css"

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    showModal: false,
    searchKey: '',
    page: 1   
  }

  componentDidUpdate(prevProps, prevState) {    
    if (this.state.searchKey !== prevState.searchKey || this.state.page !== prevState.page) {      
      this.getImages(this.state.searchKey, this.state.page)       
    }
  }

  getImages = async (key, page) => {    
      try {
      this.setState({
        isLoading: true
      })
      const data = await imgGetFunction(key, page)   
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          loadMore: this.state.page < Math.ceil(data.totalHits / 12 )        
        }) )    
    } catch (error) {
      console.log(error.message)
    } finally {
      this.setState({ isLoading: false })
    }

  }

  onSubmit = (event) => {    
    event.preventDefault();
    if (event.target.inputKey.value === this.state.searchKey) 
      {return}
    this.setState({
      images:[],
      page: 1,
      searchKey: event.target.inputKey.value
      })
  }

  loadMoreFunc = async () => {
    this.setState({ page: this.state.page + 1 })
  }


  showModal = (evt) => {   
      this.setState({
        showModal: true,
        bigImage: evt.target.alt
      })
    }

    closeModal = (event) => {
      if (event.key === 'Escape' || !event.target.closest('IMG')) {
        this.setState({ showModal: false })
      }
    }

    render() {
      const { images, showModal, bigImage, isLoading, loadMore } = this.state;
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.onSubmit} />
          <ImageGallery images={images} showModal={this.showModal}>
          </ImageGallery >
          {images.length>0 && loadMore && <Button loadMoreFunc={this.loadMoreFunc} />}          
          {showModal && <Modal src={bigImage} close={this.closeModal} />}
          {isLoading && <Loader />}
        </div>
      )
    }
  }

