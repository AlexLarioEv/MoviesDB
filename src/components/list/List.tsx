import React, { Component } from 'react'

import Item from '../item/item'
import { Parameters } from '../../types/data'

import 'antd/dist/reset.css'
import './List.css'

class List extends Component<Parameters, any> {
  render() {
    const { id, title, posterPath, overview, releaseDate } = this.props

    const elements = id.map((key, index) => {
      return (
        <Item
          posterPath={posterPath[index]}
          key={key}
          title={title[index]}
          overview={overview[index]}
          releaseDate={releaseDate[index]}
        />
      )
    })

    return <ul className="list">{elements}</ul>
  }
}

export default List
