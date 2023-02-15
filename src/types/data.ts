export interface Parameters {
  posterPath: Array<string>
  id: Array<number>
  title: Array<string>
  overview: Array<string>
  releaseDate: Array<string>
  loading: boolean
  error: boolean
  errorText: string
  labelSearch: string
  totalResults: number
  pages: Array<string>
  page: number
}
export interface Parameter {
  posterPath: string
  id: number
  title: string
  overview: string
  releaseDate: string
  loading: boolean
  error: boolean
  errorText: string
}
