import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

const movies =[
  {
    title:'맥트릭스' ,
    poster:'http://image.cine21.com/resize/cine21/poster/2016/0907/14_41_49__57cfa89dd00cd[X230,330].jpg'
  },
  {
    title:'풀매탈 자켓',
    poster:'https://mblogthumb-phinf.pstatic.net/data18/2007/1/6/4/full_metal_jacket_manif-inde9898.jpg?type=w210'
  },
  {
    title:'올드보이',
    poster:'https://upload.wikimedia.org/wikipedia/ko/thumb/4/48/Old_Boy.jpg/250px-Old_Boy.jpg'
  },
  {
    title:'스타워즈',
    poster:'https://upload.wikimedia.org/wikipedia/ko/thumb/6/6a/%EC%8A%A4%ED%83%80%EC%9B%8C%EC%A6%88_%EA%B9%A8%EC%96%B4%EB%82%9C_%ED%8F%AC%EC%8A%A4.jpg/250px-%EC%8A%A4%ED%83%80%EC%9B%8C%EC%A6%88_%EA%B9%A8%EC%96%B4%EB%82%9C_%ED%8F%AC%EC%8A%A4.jpg'
  }
]
class App extends Component {
  render() {
    return (
      <div className="App">
        {movies.map((movie, index) => {
          return <Movie title={movie.title} poster={movie.poster} key={index}/>
        })}
      </div>
    );
  }
}

export default App;
