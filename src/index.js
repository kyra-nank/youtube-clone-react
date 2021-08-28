require('dotenv').config();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = process.env.API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };      // these fields can be called whatever you want

    this.videoSearch('Kyra Nankivell');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]});
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    )
  }
}

// take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));   // go find the div with class container and render App there



// sample search
// YTSearch({ key: API_KEY, term: 'Kyra Nankivell' }, function(data) {
//   console.log(data);
// });
