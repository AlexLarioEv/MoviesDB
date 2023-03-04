import React from 'react'

import MoviesServies from '../../services/movies-servies'

const moviesServies = new MoviesServies()

const { Provider: MoviesServicetProvider, Consumer: MoviesServicetConsumer } = React.createContext(moviesServies)

export { MoviesServicetProvider, MoviesServicetConsumer }
