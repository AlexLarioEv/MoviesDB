import React, { Component } from 'react'
import { Pagination } from 'antd'

import './pagination.css'

interface Props {
  totalResults: number
  onChangePage: (page: number) => void
  error: boolean
  loading: boolean
}

class PaginationApp extends Component<Props, object> {
  render() {
    const { totalResults, onChangePage, loading, error } = this.props
    const paggination = error ? null : (
      <Pagination
        onChange={onChangePage}
        className={totalResults === 0 ? 'pagination--none' : 'pagination'}
        defaultCurrent={1}
        total={totalResults}
        disabled={totalResults === 0}
        pageSizeOptions={[6]}
        defaultPageSize={6}
      />
    )
    return paggination
  }
}

export default PaginationApp
