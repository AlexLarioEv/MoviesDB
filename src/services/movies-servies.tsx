export default class MoviesServies {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=23e61b7bfe0f2cab339fe6edd888f615&language=en-US&page='

  async getResource(keySerch: string, page: string) {
    const res = await fetch(`${this._apiBase} ${page} &query=${keySerch}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${keySerch}, received ${res.status}`)
    }
    return res.json()
  }
}
