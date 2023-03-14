import React, { Component } from 'react'

import MoviesServies from '../../Services/MoviesServies'
import SearchInput from '../SearchInput/SearchInput'
import List from '../List/List'
import PaginationApp from '../Pagination/Pagination'
import { Parameters, DataFilmsServer, DataFilmServer, DataFilm } from '../../Types/Data'
import { MoviesServicetProvider } from '../MoviesServiceContext/MoviesServiceContext'

class SearchContent extends Component<Pick<Parameters, 'idGuestSession'>, Omit<Parameters, 'network' | 'sendRateMovie'>> {
  moviesServies = new MoviesServies()

  state = {
    dataFilm: {
      id: [],
      posterPath: [],
      title: [],
      overview: [],
      releaseDate: [],
      genreIds: [],
      voteAverage: [],
      rating: [],
    },
    idGuestSession: this.props.idGuestSession,
    loading: true,
    labelSearch: 'return',
    totalResults: 0,
    pages: ['1', '2', '3'],
    page: 1,
    pageSize: 6,
    error: false,
    errorText: '',
  }

  updateMovies = (leabel: string) => {
    const p1 = this.state.pages.map((page: string) => {
      return this.moviesServies.getResource(leabel, page)
    })
    Promise.all([...p1])
      .then(this.onMoviesLoaded)
      .catch(this.onError)
  }

  updateMoviesRate = (leabel: string) => {
    const p1 = this.state.pages.map((page: string) => {
      return this.moviesServies.getResource(leabel, page)
    })
    let p2: Promise<DataFilmsServer>[] = []
    if (this.state.idGuestSession !== '') {
      p2 = ['1', '2', '3'].map((page: string) => {
        return this.moviesServies.getGuestSessionsRate(this.state.idGuestSession, page)
      })
    }
    Promise.all([...p1, ...p2])
      .then(this.onMoviesLoaded)
      .catch(this.onError)
  }

  onMoviesLoaded = (dataMovies: Array<DataFilmsServer>) => {
    if (dataMovies[0].total_results !== 0) {
      const dataMovie = dataMovies.slice(0, this.state.pages.length)
      const dataRate = dataMovies.slice(this.state.pages.length, dataMovies.length)
      this.updateDataFilm(dataMovie, dataRate)
    } else {
      this.setState({
        error: true,
        errorText: `Search did not return results for the query ${this.state.labelSearch}`,
        loading: false,
      })
    }
  }

  updateDataFilm(dataMovie: Array<DataFilmsServer>, dataRate: Array<DataFilmsServer> = []) {
    const totalResults = dataMovie[0].total_results
    this.setState(({ dataFilm, pages }) => {
      const movies = this.formDataServer(dataMovie)
      const rates = this.formDataServer(dataRate)
      return {
        dataFilm: {
          id: this.updatePropertyDate(movies, dataFilm, pages, totalResults, 'id', 'id'),
          title: this.updatePropertyDate(movies, dataFilm, pages, totalResults, 'title', 'title'),
          overview: this.updatePropertyDate(movies, dataFilm, pages, totalResults, 'overview', 'overview'),
          releaseDate: this.updatePropertyDate(movies, dataFilm, pages, totalResults, 'releaseDate', 'release_date'),
          posterPath: this.updatePropertyDate(movies, dataFilm, pages, totalResults, 'posterPath', 'poster_path'),
          genreIds: this.updatePropertyDate(movies, dataFilm, pages, totalResults, 'genreIds', 'genre_ids'),
          voteAverage: this.updatePropertyDate(movies, dataFilm, pages, totalResults, 'voteAverage', 'vote_average'),
          rating: this.updateRatingData(rates, movies, dataFilm, pages, totalResults),
        },
        loading: false,
        totalResults,
        error: false,
      }
    })
  }

  formDataServer(dataType: Array<DataFilmsServer>) {
    const allMovies = []
    allMovies.push(dataType.map((arr: DataFilmsServer) => arr.results))
    return allMovies.flat(2)
  }

  updatePropertyDate(
    movies: Array<DataFilmServer>,
    dataFilm: DataFilm,
    pages: Array<string>,
    totalResults: number,
    propName: 'id' | 'title' | 'overview' | 'releaseDate' | 'rating' | 'posterPath' | 'genreIds' | 'voteAverage',
    propNameData: 'id' | 'title' | 'overview' | 'release_date' | 'rating' | 'poster_path' | 'genre_ids' | 'vote_average'
  ) {
    const prop = dataFilm[propName]
    const leftIndex = (Number(pages[0]) - 1) * 20
    const rightIndex = Number(pages[2]) * 20
    prop.length = totalResults
    let newProp = Array(totalResults)
    newProp = [...prop.slice(0, leftIndex), ...movies.map((item: DataFilmServer) => item[propNameData]), ...prop.slice(rightIndex, totalResults)]
    return newProp
  }

  updateRatingData(ratings: Array<DataFilmServer>, movies: Array<DataFilmServer>, dataFilm: DataFilm, pages: Array<string>, totalResults: number) {
    const { rating } = dataFilm
    const leftIndex = (Number(pages[0]) - 1) * 20
    const rightIndex = Number(pages[2]) * 20
    rating.length = totalResults
    let newRating = Array(60)
    ratings.forEach((rateElement) => {
      movies.forEach((movieElement, index) => {
        const ids = movieElement.id === rateElement.id ? index : -1
        if (ids >= 0) {
          newRating = [...newRating.slice(0, ids), rateElement.rating, ...newRating.slice(ids + 1, totalResults)]
        }
      })
    })
    return [...rating.slice(0, leftIndex), ...newRating, ...rating.slice(rightIndex, totalResults)]
  }

  onError = (err: Error) => {
    this.setState({ error: true, loading: false, errorText: err.message })
  }

  clearData = () => {
    this.setState({
      dataFilm: { id: [], posterPath: [], title: [], overview: [], releaseDate: [], genreIds: [], voteAverage: [], rating: [] },
      loading: true,
      page: 1,
      pages: ['1', '2', '3'],
    })
  }

  onChangePage = (page: number, pageSize: number) => {
    this.setState({ page, pageSize })
    this.setState(() => {
      return {
        pages: [
          `${1 + 3 * Math.floor((page - 1) / (60 / pageSize))}`,
          `${2 + 3 * Math.floor((page - 1) / (60 / pageSize))}`,
          `${3 + 3 * Math.floor((page - 1) / (60 / pageSize))}`,
        ],
        loading: true,
      }
    })
  }

  changeLabel = (label: string) => {
    this.setState(() => {
      return { labelSearch: label }
    })
  }

  sendRateMovie = (movieId: string, value: number) => {
    const objValue = {
      value,
    }
    this.moviesServies.getMoviesRate(movieId, String(this.props.idGuestSession), objValue)
  }

  componentDidUpdate(prevProps: Pick<Parameters, 'idGuestSession'>, prevState: Readonly<Parameters>): void {
    if (prevProps.idGuestSession !== this.props.idGuestSession) {
      this.setState({ idGuestSession: this.props.idGuestSession })
    }
    if (prevState.pages !== this.state.pages) {
      this.updateMoviesRate(this.state.labelSearch)
    }
  }

  componentDidMount(): void {
    this.updateMoviesRate(this.state.labelSearch)
  }

  render() {
    return (
      <MoviesServicetProvider value={this.moviesServies}>
        <div>
          <SearchInput
            updateMoviesRate={this.updateMoviesRate}
            clearData={this.clearData}
            changeLabel={this.changeLabel}
            loading={this.state.loading}
          ></SearchInput>
          <List
            dataFilm={this.state.dataFilm}
            loading={this.state.loading}
            error={this.state.error}
            errorText={this.state.errorText}
            page={this.state.page}
            pageSize={this.state.pageSize}
            idGuestSession={this.state.idGuestSession}
            sendRateMovie={this.sendRateMovie}
          ></List>
          <PaginationApp
            pageSize={this.state.pageSize}
            totalResults={this.state.totalResults}
            onChangePage={this.onChangePage}
            error={this.state.error}
            page={this.state.page}
          />
        </div>
      </MoviesServicetProvider>
    )
  }
}

export default SearchContent
