import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./SearchBar/SearchBar";
import { Modal } from './Modal/Modal'
import { Loader } from "./Loader/Loader";
import { Button } from './Button/Button'

import { imgGetFunction } from 'Api/Api.js'

import css from "./App.module.css"

export class App extends Component  {
  state = {    
    images: null,
    isLoading: false,
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

  onSubmit = (event) => {
    event.preventDefault()   
    this.setState({ searchKey: event.target.inputKey.value  })    
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
  }

  closeModal = (event) => {  
    if (event.key === 'Escape' || !event.target.closest('IMG')) {
      this.setState({ showModal: false }) 
    }
   
  }

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images = { this.state.images } showModal={this.showModal}>
      </ImageGallery >
      {this.state.images && this.state.total > this.state.page*12 && <Button loadMoreFunc={this.loadMoreFunc} />}
      {this.state.showModal && <Modal src={this.state.bigImage} close={this.closeModal } />}
      {this.state.isLoading&&<Loader />}
    </div>
    )
    }
};
