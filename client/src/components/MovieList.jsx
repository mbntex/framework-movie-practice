import React from 'react';
import SpecificMovie from './Movie.jsx';



var TheMovieList = (props) => (
  <div>
    {props.data.map((item, i) => <SpecificMovie info={item} key={i}/>)}
  </div>
)






export default TheMovieList;


