import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./SearchBar/SearchBar";
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
    </div>
    )
    }
};
