import React from 'react'
import PropTypes from 'prop-types'

import { OptionsProvider } from '../store/options'
import { FlashProvider } from '../store/flash'

const StateProvider = ({ children }) => (
  <FlashProvider>
    <OptionsProvider>{children}</OptionsProvider>
  </FlashProvider>
)

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StateProvider
