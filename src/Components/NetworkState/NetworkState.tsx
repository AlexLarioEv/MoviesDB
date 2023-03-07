import React from 'react'

interface Props {
  onNetworkState: () => void
}

const NetworkState: React.FC<Props> = ({ onNetworkState }) => {
  window.onoffline = () => {
    onNetworkState()
  }
  window.ononline = () => {
    onNetworkState()
  }
  return <React.Fragment />
}
export default NetworkState
