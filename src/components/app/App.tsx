import React, { Component } from 'react'

import MoviesServies from '../../services/movies-servies'
import List from '../list/List'
import { Parameters } from '../../types/data'

import 'antd/dist/reset.css'
import './App.css'

class App extends Component<object, Parameters> {
  moviesServies = new MoviesServies()

  state = {
    id: [],
    posterPath: [],
    title: [],
    overview: [],
    releaseDate: [],
  }

  constructor(props: Parameters) {
    super(props)
    this.updateMovies()
  }

  updateMovies = () => {
    this.moviesServies.getResource('The way back').then((dataMovies) => {
      this.setState({
        id: dataMovies.results.map((item: any) => item.id),
        posterPath: dataMovies.results.map((item: any) => item.poster_path),
        title: dataMovies.results.map((item: any) => item.title),
        overview: dataMovies.results.map((item: any) => item.overview),
        releaseDate: dataMovies.results.map((item: any) => item.release_date),
      })
    })
  }

  render() {
    return (
      <div>
        <List
          id={this.state.id}
          posterPath={this.state.posterPath}
          title={this.state.title}
          overview={this.state.overview}
          releaseDate={this.state.releaseDate}
        ></List>
      </div>
    )
  }
}
export default App
