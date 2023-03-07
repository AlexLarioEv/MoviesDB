import React, { Component } from 'react'

import Item from '../Item/Item'
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../ErrorMesage/ErrorMesage'
import { Parameters } from '../../Types/Data'
import { MoviesServicetConsumer } from '../MoviesServiceContext/MoviesServiceContext'

import 'antd/dist/reset.css'
import './List.css'

class List extends Component<Omit<Parameters, 'labelSearch' | 'totalResults' | 'pages' | 'network' | 'counter'>, Pick<Parameters, 'dataFilm'>> {
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
  }

  render() {
    const { dataFilm, loading, error, errorText, page, pageSize, sendRateMovie } = this.props
    const { id, title, posterPath, overview, releaseDate, genreIds, voteAverage, rating } = dataFilm
    let elements = null
    if (dataFilm.id[(page - 1) * pageSize]) {
      elements = id.map((key, index) => {
        if (index >= pageSize * (page - 1) && index < pageSize * page) {
          return (
            <MoviesServicetConsumer key={key}>
              {({ getGanre }) => {
                return (
                  <Item
                    getGanre={getGanre}
                    sendRateMovie={sendRateMovie}
                    posterPath={posterPath[index]}
                    id={key}
                    key={key}
                    title={title[index]}
                    overview={overview[index]}
                    releaseDate={releaseDate[index]}
                    genreIds={genreIds[index]}
                    voteAverage={voteAverage[index]}
                    rating={rating[index]}
                  />
                )
              }}
            </MoviesServicetConsumer>
          )
        }
        return null
      })
    }

    const hasData = !(loading || error)

    const errorMessage = error ? <ErrorMessage errorText={errorText} /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? elements : null

    return (
      <ul className="list">
        {errorMessage} {spinner} {content}
      </ul>
    )
  }
}

export default List
