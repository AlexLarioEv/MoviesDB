import React, { Component } from 'react'
import { Input } from 'antd'
import debaunce from 'lodash.debounce'

import './search-input.css'

interface Props {
  updateMovies: (arg0: string) => void
  clearData: () => void
}

interface State {
  label: string
}

class SearchInput extends Component<Props, State> {
  state = {
    label: '',
  }

  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({ label: e.target.value })
    // this.props.clearData()
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (prevState !== this.state) {
      this.props.updateMovies(this.state.label)
    }
  }

  render() {
    return (
      <Input onChange={debaunce(this.onChange, 1000)} className="input" size="large" placeholder="Type to search..." />
    )
  }
}

export default SearchInput
