export default class MoviesServies {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=23e61b7bfe0f2cab339fe6edd888f615&language=en-US&page='

  _apiGanre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=23e61b7bfe0f2cab339fe6edd888f615&language=en-US'

  _apiGuestSessions =
    'https://api.themoviedb.org/3/guest_session//rated/movies?api_key=23e61b7bfe0f2cab339fe6edd888f615&language=en-US&sort_by=created_at.asc'

  _apiMoviesRate = 'https://api.themoviedb.org/3/movie//rating?api_key=23e61b7bfe0f2cab339fe6edd888f615'

  async getResource(keySerch: string, page: string) {
    const res = await fetch(`${this._apiBase} ${page} &query=${keySerch}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${keySerch}, received ${res.status}`)
    }
    return res.json()
  }

  async getGanre() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=23e61b7bfe0f2cab339fe6edd888f615&language=en-US')
    if (!res.ok) {
      throw new Error(`Could not fetch ganre, received ${res.status}`)
    }
    return res.json()
  }

  async getCreateGuestSessions() {
    const res = await fetch(' https://api.themoviedb.org/3/authentication/guest_session/new?api_key=23e61b7bfe0f2cab339fe6edd888f615')
    if (!res.ok) {
      throw new Error(`Could not fetch ganre, received ${res.status}`)
    }
    return res.json()
  }

  async getGuestSessionsRate(guestSessionId: string, page: string) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=23e61b7bfe0f2cab339fe6edd888f615&page=${page}&language=en-US&sort_by=created_at.asc`
    )
    if (!res.ok) {
      throw new Error(`Could not fetch ganre, received ${res.status}`)
    }
    return res.json()
  }

  async getMoviesRate(movieId: string, guestSessionId: string, value: { value: number }) {
    const res = await fetch(`${this._apiMoviesRate.slice(0, 35)}${movieId}${this._apiMoviesRate.slice(35)}&guest_session_id=${guestSessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(value),
    })
    if (!res.ok) {
      throw new Error(`Could not fetch ganre, received ${res.status}`)
    }
    return res.json()
  }
}
