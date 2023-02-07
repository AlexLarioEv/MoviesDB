import React from 'react'
import type { FC } from 'react'

import Item from '../item/item'

import 'antd/dist/reset.css'
import './List.css'

const List: FC = () => (
  <ul className="list">
    <Item></Item>
  </ul>
)

export default List
