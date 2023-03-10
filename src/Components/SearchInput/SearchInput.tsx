import React, { Component } from 'react'
import { Input } from 'antd'
import debaunce from 'lodash.debounce'

import './SearchInput.css'

interface Props {
  updateMoviesRate: (arg0: string) => void
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
    if (e.target.value.match(/\S/)) {
      this.props.clearData()
      this.setState(() => {
        return { label: e.target.value, loading: true }
      })
      this.props.changeLabel(e.target.value)
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (prevState !== this.state) {
      this.props.updateMoviesRate(this.state.label)
    }
  }

  render() {
    return <Input onChange={debaunce(this.onChange, 1000)} className="input" size="large" placeholder="Type to search..." />
  }
}

export default SearchInput
