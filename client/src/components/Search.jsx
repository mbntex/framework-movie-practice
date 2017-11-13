import React from 'react';

var Search = (props) => (
  <div>
    <input type="text" onChange={props.changeFn}></input>
    <button id="currentSearch" onClick={props.searchFn}>Search!</button>
    <button id="reset" onClick={props.resetFn}>Reset</button>
    <button id="reset" onClick={props.getDataFn}>Data</button>
  </div>

)



export default Search;