import React, { Component } from 'react'
import { Input } from 'antd'
import debaunce from 'lodash.debounce'

import './search-input.css'

interface Props {
  updateMovies: (arg0: string) => void
  clearData: () => void
  changeLabel: (label: string) => void
  loading: boolean
}

interface State {
  label: string
}

class SearchInput extends Component<Props, State> {
  state = {
    label: '',
  }

  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.clearData()
    this.setState(() => {
      return { label: e.target.value, loading: true }
    })
    this.props.changeLabel(e.target.value)
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (prevState !== this.state) {
      this.props.updateMovies(this.state.label)
    }
  }

  render() {
    return <Input onChange={debaunce(this.onChange, 1000)} className="input" size="large" placeholder="Type to search..." />
  }
}

export default SearchInput
