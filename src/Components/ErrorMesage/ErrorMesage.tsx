import React from 'react'
import { Alert } from 'antd'

import 'antd/dist/reset.css'
import './Error.css'
import { Parameter } from '../../Types/Data'

const ErrorMessage: React.FC<Pick<Parameter, 'errorText'>> = (props) => {
  const { errorText } = props
  return <Alert className="error" message="Error" description={errorText} type="error" showIcon />
}

export default ErrorMessage
