import React from 'react'

import MoviesServies from '../../Services/MoviesServies'

const moviesServies = new MoviesServies()

const { Provider: MoviesServicetProvider, Consumer: MoviesServicetConsumer } = React.createContext(moviesServies)

export { MoviesServicetProvider, MoviesServicetConsumer }
