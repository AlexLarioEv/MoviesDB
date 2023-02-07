import React from 'react'
import type { FC } from 'react'

import 'antd/dist/reset.css'
import './Item.css'

const Item: FC = () => {
  return (
    <li className="list__item item">
      <div className="item__wrapper">
        <img
          className="item__image"
          src="https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/9effa736-3c36-418d-afa3-0901cf343bdb/1920x"
          alt="img"
        />
      </div>
      <div className="item__description">
        <h2 className="item__title">The way back</h2>
        <span className="item__date">March 5, 2020 </span>
        <div className="item__genres"></div>
        <p className="item__text">
          A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
        </p>
      </div>
    </li>
  )
}

export default Item
