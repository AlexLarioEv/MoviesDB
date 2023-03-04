/* eslint-disable indent */
import React, { Component } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate } from 'antd'

import { Parameter, DataGenres } from '../../types/data'

import img from './image.jpg'

import 'antd/dist/reset.css'
import './Item.css'

class Item extends Component<
  Omit<Parameter, 'loading' | 'error' | 'errorText'>,
  { dataGanre: { genres: Array<{ id: number; name: string }> }; valueRate: { value: number } }
> {
  state = {
    dataGanre: { genres: [{ id: 0, name: '' }] },
    valueRate: { value: 0 },
  }

  cropText(text: string, len: number) {
    if (text.length > len) {
      const newLen = text.indexOf(' ', len)
      return text.length > newLen ? `${text.slice(0, newLen)}...` : text
    }
    return text
  }

  updateGenreData = () => {
    this.props.getGanre().then(this.onGanresLoaded).catch()
  }

  onGanresLoaded = (dataGanre: { genres: Array<{ id: number; name: string }> }) => {
    this.setState({ dataGanre })
  }

  addGeners = () => {
    const itemGenre = this.props.genreIds.map((id) => {
      const ganr = this.state.dataGanre.genres.map((element) => {
        if (Number(id) === element.id) {
          return element.name
        }
      })
      return (
        <span className="item__genr" key={id}>
          {ganr}
        </span>
      )
    })
    return itemGenre
  }

  onChange = (value: number) => {
    this.props.sendRateMovie(String(this.props.id), value)
  }

  componentDidMount(): void {
    this.updateGenreData()
  }

  componentDidUpdate(
    prevProps: Readonly<Omit<Parameter, 'id' | 'loading' | 'error' | 'errorText'>>,
    prevState: Readonly<{ dataGanre: DataGenres; valueRate: { value: number } }>
  ): void {
    if (prevState.dataGanre !== this.state.dataGanre) {
      this.addGeners()
    }
  }

  render() {
    const { posterPath, title, overview, releaseDate, voteAverage, rating } = this.props
    const rateStatus = voteAverage < 3 ? 'low' : voteAverage < 5 ? 'middle' : voteAverage < 7 ? 'high' : voteAverage > 7 ? 'overhigh' : ''
    return (
      <li className="list__item item">
        <div className="item__wrapper">
          <img className="item__image" src={posterPath === null ? img : `https://image.tmdb.org/t/p/original${posterPath}`} alt="img" />
        </div>
        <div className="item__description">
          <div className="item__top-block">
            <h2 className="item__title">{title}</h2>
            <div className={`rating ${rateStatus}`}>
              <span className="rating__value">{voteAverage.toFixed(1)}</span>
            </div>
          </div>
          <span className="item__date">{releaseDate === '' ? '' : format(new Date(releaseDate), 'MMMM dd, yyyy', { locale: enGB })}</span>
          <div className="item__genres">{this.addGeners()}</div>
          <p className="item__text">{this.cropText(overview, 100)}</p>
          <Rate onChange={this.onChange} defaultValue={rating} className="rate" count={10} />
        </div>
      </li>
    )
  }
}

export default Item
