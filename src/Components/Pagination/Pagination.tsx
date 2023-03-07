import React, { Component } from 'react'
import { Pagination } from 'antd'

import './Pagination.css'

interface Props {
  totalResults: number
  onChangePage: (page: number, pageSize: number) => void
  error: boolean
  page: number
  pageSize: number
}

class PaginationApp extends Component<Props> {
  render() {
    const { totalResults, onChangePage, error, page, pageSize } = this.props
    const paggination = error ? null : (
      <Pagination
        onChange={onChangePage}
        className={totalResults / pageSize <= 1 ? 'pagination--none' : 'pagination'}
        defaultCurrent={1}
        current={page}
        total={totalResults}
        disabled={totalResults === 0}
        pageSizeOptions={[6, 10, 30, 60]}
        defaultPageSize={6}
      />
    )
    return paggination
  }
}

export default PaginationApp
