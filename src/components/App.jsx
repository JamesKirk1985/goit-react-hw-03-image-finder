import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./SearchBar/SearchBar";
import { Loader } from "./Loader/Loader"
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import css from "./App.module.css"
import { Component } from "react";
export class App extends Component  {
  state = {     
    searchKey: ""
  }
  onSubmit = (event) => {
    event.preventDefault()   
    this.setState({ searchKey: event.target.inputKey.value  })    
  }
  loadMoreFunc = () => {
    console.log('loadMoreFunc')
  }

  render() {
  return (
    <div className={ css.App}>
      <SearchBar onSubmit={ this.onSubmit} />
      <ImageGallery searchKey={this.state.searchKey} >

      </ImageGallery>
      
      {/* <Loader isLoading={ } /> */}
    </div>
    )
    }
};
