import React, { Component } from 'react'
import { Pagination } from 'antd'

import './pagination.css'

interface Props {
  totalResults: number
  onChangePage: (page: number) => void
}

class PaginationApp extends Component<Props, object> {
  render() {
    const { totalResults, onChangePage } = this.props
    return (
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
  }
}

export default PaginationApp
