export interface Parameters {
  posterPath: Array<string>
  id: Array<number>
  title: Array<string>
  overview: Array<string>
  releaseDate: Array<string>
}
export interface Parameter {
  posterPath: string
  id: number
  title: string
  overview: string
  releaseDate: string
}
export interface State {
  data: Array<Parameters>
}
