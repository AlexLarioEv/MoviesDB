import React, { Component } from 'react'
import isEmpty from 'lodash.isempty'

import MoviesServies from '../../services/movies-servies'
import NetworkState from '../network-state/network-state'
import SearchInput from '../search-input/search-input'
import List from '../list/list'
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
    loading: false,
    error: false,
    errorText: '',
    labelSearch: '',
    totalResults: 0,
    pages: ['1', '2', '3'],
    page: 1,
    network: true,
  }

  // componentDidMount(): void {
  //   this.updateMovies('')
  // }

  componentDidUpdate(prevProps: object, prevState: Readonly<Parameters>): void {
    if (prevState.pages !== this.state.pages) {
      this.updateMovies(this.state.labelSearch)
    }
  }

  onMoviesLoaded = (dataMovies: any) => {
    const allMovies = []
    allMovies.push(dataMovies.map((arr: any) => arr.results))
    const movies: any = allMovies.flat(2)

    if (dataMovies[0].total_results !== 0) {
      this.setState(({ id, title, overview, releaseDate, posterPath }) => {
        return {
          id: [...id, ...movies.map((item: any) => item.id)],
          title: [...title, ...movies.map((item: any) => item.title)],
          overview: [...overview, ...movies.map((item: any) => item.overview)],
          releaseDate: [...releaseDate, ...movies.map((item: any) => item.release_date)],
          posterPath: [...posterPath, ...movies.map((item: any) => item.poster_path)],
          loading: false,
          totalResults: dataMovies[0].total_results,
          error: false,
        }
      })
    } else {
      this.setState({
        error: true,
        errorText: `Search did not return results for the query ${this.state.labelSearch}`,
        loading: false,
      })
    }
  }

  onError = (err: Error) => {
    this.setState({ error: true, loading: false, errorText: err.message })
  }

  updateMovies = (leabel: string) => {
    Promise.all(
      this.state.pages.map((page: string) => {
        return this.moviesServies.getResource(leabel, page)
      })
    )
      .then(this.onMoviesLoaded)
      .catch(this.onError)
  }

  clearData = () => {
    this.setState({ id: [], posterPath: [], title: [], overview: [], releaseDate: [], loading: true })
  }

  onChangePage = (page: number) => {
    this.setState({ page })
    if (Math.floor(page / 10) > Math.floor(this.state.page / 10)) {
      this.setState(() => {
        return {
          pages: [
            `${1 + 3 * Math.floor(page / 10)}`,
            `${2 + 3 * Math.floor(page / 10)}`,
            `${3 + 3 * Math.floor(page / 10)}`,
          ],
        }
      })
    }
  }

  onNetworkState = () => {
    this.setState(({ network }) => {
      const newNetwork = !network
      return { network: newNetwork }
    })
  }

  changeLabel = (label: string) => {
    this.setState(() => {
      return { labelSearch: label }
    })
  }

  render() {
    const content = (
      <div>
        <NetworkState onNetworkState={this.onNetworkState} />
        <SearchInput
          updateMovies={this.updateMovies}
          clearData={this.clearData}
          changeLabel={this.changeLabel}
          loading={this.state.loading}
        ></SearchInput>
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
        <PaginationApp
          totalResults={this.state.totalResults}
          onChangePage={this.onChangePage}
          error={this.state.error}
          loading={this.state.loading}
        />
      </div>
    )

    const error = <ErrorMessage errorText="No internet connection"></ErrorMessage>

    const element = this.state.network ? content : error
    return element
  }
}
export default App
