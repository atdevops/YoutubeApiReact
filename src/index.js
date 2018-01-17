import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch  from 'youtube-api-search'

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = "AIzaSyA2aLvXd2y6NvZ-NNbE4jUCObXl6cdXWik";

class App extends Component {

  constructor(props) {
      super(props);

    this.state = {
      videos: [],
      selectedVideo: null};

      this.videoSearch('surfboards')
    
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({videos : videos, selectedVideo: videos[0]}); //this.setState({ videos }); when key and value is same
    })
  }

  render () {

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);

    return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList videos={ this.state.videos } onVideoSelect={selectedVideo => this.setState({selectedVideo})} />
      </div>
    )
  }
}

ReactDOM.render(
    <App />
  , document.querySelector('.container'));
