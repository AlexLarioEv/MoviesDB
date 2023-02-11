import React, { Component } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { Parameter } from '../../types/data'

import 'antd/dist/reset.css'
import './Item.css'

class Item extends Component<Omit<Parameter, 'id'>, any> {
  cropText(text: string, len: number) {
    const newLen = text.indexOf(' ', len)
    return text.length > len ? `${text.slice(0, len)}...` : text
  }

  render() {
    const { posterPath, title, overview, releaseDate } = this.props
    return (
      <li className="list__item item">
        <div className="item__wrapper">
          <img className="item__image" src={`https://image.tmdb.org/t/p/original${posterPath}`} alt="img" />
        </div>
        <div className="item__description">
          <h2 className="item__title">{title}</h2>
          <span className="item__date">
            {releaseDate === '' ? '' : format(new Date(releaseDate), 'MMMM dd, yyyy', { locale: enGB })}
          </span>
          <div className="item__genres">
            <span className="item__genr">1</span>
            <span className="item__genr">2</span>
          </div>
          <p className="item__text">{this.cropText(overview, 300)}</p>
        </div>
      </li>
    )
  }
}

export default Item
