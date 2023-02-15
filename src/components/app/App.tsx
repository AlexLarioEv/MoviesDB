import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import isEmpty from 'lodash.isempty'

import MoviesServies from '../../services/movies-servies'
import SearchInput from '../search-input/search-input'
import List from '../list/list'
// eslint-disable-next-line import/namespace
import PaginationApp from '../pagination/pagination'
import ErrorMessage from '../error-mesage/error-mesage'
import { Parameters } from '../../types/data'

import 'antd/dist/reset.css'
import './app.css'

class App extends Component<object, Parameters> {
  moviesServies = new MoviesServies()

  state = {
    id: [],
    posterPath: [],
    title: [],
    overview: [],
    releaseDate: [],
    loading: true,
    error: false,
    errorText: '',
    labelSearch: '',
    totalResults: 0,
    pages: ['1', '2', '3'],
    page: 1,
  }

  componentDidMount(): void {
    this.updateMovies('')
  }

  onMoviesLoaded = (dataMovies: any) => {
    this.setState({ loading: false, totalResults: dataMovies.total_results })
    // if (!isEmpty(dataMovies.results)) {
    this.setState({
      id: [...this.state.id, ...dataMovies.results.map((item: any) => item.id)],
      posterPath: [...this.state.posterPath, ...dataMovies.results.map((item: any) => item.poster_path)],
      title: [...this.state.title, ...dataMovies.results.map((item: any) => item.title)],
      overview: [...this.state.overview, ...dataMovies.results.map((item: any) => item.overview)],
      releaseDate: [...this.state.releaseDate, ...dataMovies.results.map((item: any) => item.release_date)],
    })
    // }
    console.log(this.state)
  }

  onError = (err: Error) => {
    this.setState({ error: true, loading: false, errorText: err.message })
  }

  updateMovies = (leabel: string) => {
    this.state.pages.forEach((page) => {
      setTimeout(() => this.moviesServies.getResource(leabel, page).then(this.onMoviesLoaded).catch(this.onError), 500)
    })
  }

  // если label изменился тогда удаляем
  clearData = () => {
    this.setState({ id: [], posterPath: [], title: [], overview: [], releaseDate: [] })
  }

  onChangePage = (page: number) => {
    this.setState({ page })
  }

  render() {
    return (
      <div>
        <Online>
          <SearchInput updateMovies={this.updateMovies} clearData={this.clearData}></SearchInput>
          <List
            id={this.state.id}
            posterPath={this.state.posterPath}
            title={this.state.title}
            overview={this.state.overview}
            releaseDate={this.state.releaseDate}
            loading={this.state.loading}
            error={this.state.error}
            errorText={this.state.errorText}
            page={this.state.page}
          ></List>
          <PaginationApp totalResults={this.state.totalResults} onChangePage={this.onChangePage} />
        </Online>
        <Offline>
          <ErrorMessage errorText="No internet connection"></ErrorMessage>
        </Offline>
      </div>
    )
  }
}
export default App
