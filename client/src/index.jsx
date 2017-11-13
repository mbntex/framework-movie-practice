import React from 'react';
import ReactDOM  from 'react-dom';
import TheMovieList from './components/MovieList.jsx';
import Search from './components/Search.jsx';
var $ = require('jquery');

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      currentSearch: '',
      render: []
    };
  }

  getDataFn () {
    $.ajax({
      url: '/load',
      type: 'GET',
      //data: {},
      //dataType: "application/json",
      success: function (data) {
        console.log('Get FN Worked!');
        console.log('DDATTA = ', data);
        this.setState({movies: data});
        this.setState({render: data});
      }.bind(this),
      error: function (error) {
        console.log('AJAX GET ERROR', error);
      }
    })
  };

  postDataFn (query) {
    $.ajax({
      url: '/movies',
      type: 'POST',
      data: {q: query},
      //dataType: "application/json",
      success: function (data) {
        console.log('POST FN Worked!');
        console.log('DATA IN THE POSTBACK!!! = ', data);
        this.getDataFn();
      }.bind(this),
      error: function (error) {
        console.log('AJAX POST ERROR', error);
      }
    })
  };

  componentWillMount () {
    console.log('will mount ran!');
    this.getDataFn();
    this.setState({render: this.state.movies});
  }

  // handleChange(e) {
  //   var stateKey = e.target.id;
  //   this.setState({[e.target.id]: e.target.value})
  // }

  handleChange (e) {
    this.setState({currentSearch: e.target.value});
  }
  
  resetFn (e) {
    // this.setState({render: [
    //     {title: 'Mean Girls'},
    //     {title: 'Hackers'},
    //     {title: 'The Grey'},
    //     {title: 'Sunshine'},
    //     {title: 'Ex Machina'}]});
    this.getDataFn();
  }

  searchSubmitFn (e) {
    console.log(this.state.currentSearch);
    var temp = [];
    for (var i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i].title === this.state.currentSearch) {
        temp.push(this.state.movies[i]);
        this.setState({render: temp});
      } 
    }
    if (temp.length < 1) {
      console.log('NEED TO ADD MOVIE HERE!');
      this.postDataFn(this.state.currentSearch);
    }
  }

  render() {
    return (
      <div>
        <p>Search</p>
        <Search searchFn={this.searchSubmitFn.bind(this)} resetFn={this.resetFn.bind(this)} getDataFn={this.getDataFn.bind(this)} changeFn={this.handleChange.bind(this)}/>
        <ol>
          <TheMovieList data={this.state.render}/>
        </ol>
      </div>
    )
  }
}

ReactDOM.render( <MovieList />, document.getElementById('app'));
