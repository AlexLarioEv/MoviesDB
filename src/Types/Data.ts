export interface Parameters {
  dataFilm: DataFilm
  idGuestSession: string
  loading: boolean
  error: boolean
  errorText: string
  labelSearch: string
  totalResults: number
  pages: Array<string>
  page: number
  pageSize: number
  network: boolean
  sendRateMovie: (movieId: string, value: number) => void
}
export interface Parameter {
  posterPath: string
  id: number
  title: string
  overview: string
  releaseDate: string
  rating: number
  genreIds: Array<string>
  voteAverage: number
  loading: boolean
  error: boolean
  errorText: string
  getGanre: () => Promise<DataGenres>
  sendRateMovie: (movieId: string, value: number) => void
}
export interface DataFilm {
  posterPath: Array<string>
  id: Array<number>
  title: Array<string>
  overview: Array<string>
  releaseDate: Array<string>
  genreIds: Array<Array<string>>
  voteAverage: Array<number>
  rating: Array<number>
}
export interface DataFilmsServer {
  page: number
  results: Array<DataFilmServer>
  total_results: number
  total_pages: number
}
export interface DataFilmServer {
  poster_path: string
  id: number
  title: string
  overview: string
  release_date: string
  rating: number
  genre_ids: Array<string>
  vote_average: number
}
export interface DataGenres {
  genres: Array<{ id: number; name: string }>
}
