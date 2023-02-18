import React, { Component } from 'react'

import Item from '../item/item'
import Spinner from '../spinner/spinner'
import ErrorMessage from '../error-mesage/error-mesage'
import { Parameters } from '../../types/data'

import 'antd/dist/reset.css'
import './list.css'

class List extends Component<
  Omit<Parameters, 'labelSearch' | 'totalResults' | 'pages' | 'network'>,
  Pick<Parameters, 'id' | 'title' | 'overview' | 'posterPath' | 'releaseDate'>
> {
  render() {
    const { id, title, posterPath, overview, releaseDate, loading, error, errorText, page } = this.props

    const elements = id.map((key, index) => {
      if (index >= 6 * (page - 1) && index < 6 * page) {
        return (
          <Item
            posterPath={posterPath[index]}
            key={key}
            title={title[index]}
            overview={overview[index]}
            releaseDate={releaseDate[index]}
          />
        )
      }
      return null
    })

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
