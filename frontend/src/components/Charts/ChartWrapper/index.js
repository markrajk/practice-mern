import React, { useState, useEffect } from 'react'
import { Container, Header, Title, Body } from './styles'
import BxCogIcon from '../../Icons/BxCogIcon'
import PropTypes from 'prop-types'

const ChartWrapper = ({
  label,
  labelUpdate,
  settingsUpdate,
  children,
  isOwner,
}) => {
  const [labelValue, setLabelValue] = useState(label)
  // const [bool, setBool] = useState(false)

  const onLabelChangeHandler = (value) => {
    setLabelValue(value)
    labelUpdate(value)
  }

  const onSettingsUpdateHandler = () => {
    settingsUpdate()
  }

  useEffect(() => {
    //console.log('CHART WRAPPER')
  })

  return (
    <Container>
      <Header>
        {/* <Title
          value={labelValue}
          placeholder="Enter name of chart"
          onChange={(e) => onLabelChangeHandler(e.currentTarget.value)}
        /> */}
        <Title>{labelValue}</Title>
        {isOwner && (
          <i onClick={onSettingsUpdateHandler}>
            <BxCogIcon />
          </i>
        )}
      </Header>
      <Body>{children}</Body>
    </Container>
  )
}

ChartWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  labelUpdate: PropTypes.func.isRequired,
}

export default ChartWrapper
