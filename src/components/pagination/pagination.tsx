import React, { Component } from 'react'
import { Pagination } from 'antd'

import './pagination.css'

interface Props {
  totalResults: number
  onChangePage: (page: number, pageSize: number) => void
  error: boolean
  page: number
}

class PaginationApp extends Component<Props, object> {
  render() {
    const { totalResults, onChangePage, error, page } = this.props
    const paggination = error ? null : (
      <Pagination
        onChange={onChangePage}
        className={totalResults === 0 ? 'pagination--none' : 'pagination'}
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
