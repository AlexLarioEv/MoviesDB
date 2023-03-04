import React, { Component } from 'react'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'

import MoviesServies from '../../services/movies-servies'
import RatedContent from '../rated-content/rated-conten'
import SearchContent from '../search-content/search-content'
import ErrorMessage from '../error-mesage/error-mesage'
import { Parameters } from '../../types/data'
import { MoviesServicetProvider } from '../movies-service-context/movies-service-context'

import 'antd/dist/reset.css'
import './app.css'

class App extends Component<object, Pick<Parameters, 'idGuestSession' | 'loading' | 'error' | 'errorText' | 'network'>> {
  moviesServies = new MoviesServies()

  state = {
    idGuestSession: '',
    loading: false,
    network: true,
    error: false,
    errorText: '',
  }

  createGuestSession = () => {
    this.moviesServies.getCreateGuestSessions().then(this.onGuestSession).catch(this.onError)
  }

  onGuestSession = (guestSession: { success: boolean; guest_session_id: string }) => {
    if (guestSession.success) {
      this.setState({ idGuestSession: guestSession.guest_session_id })
    }
  }

  onError = (err: Error) => {
    this.setState({ error: true, loading: false, errorText: err.message })
  }

  onNetworkState = () => {
    this.setState(({ network }) => {
      const newNetwork = !network
      return { network: newNetwork }
    })
  }

  componentDidMount(): void {
    this.createGuestSession()
  }

  render() {
    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Search',
        children: <SearchContent idGuestSession={this.state.idGuestSession}></SearchContent>,
      },
      {
        key: '2',
        label: 'Rated',
        children: <RatedContent idGuestSession={this.state.idGuestSession}></RatedContent>,
      },
    ]
    const tabsContent = this.state.network ? (
      <MoviesServicetProvider value={this.moviesServies}>
        <Tabs className="tabs" destroyInactiveTabPane={true} centered defaultActiveKey="1" items={items} />
      </MoviesServicetProvider>
    ) : (
      <ErrorMessage errorText="No internet connection"></ErrorMessage>
    )
    return tabsContent
  }
}
export default App
