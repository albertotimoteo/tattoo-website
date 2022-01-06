/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import useCreateStore from '../../utils/useCreateStore'
import flashActions from './actions'

const initialState = []
const FlashStore = useCreateStore(() => {
  const [$flash, setFlash] = useState(initialState)
  const actions = flashActions(setFlash)

  useEffect(() => {
    if (!$flash.length) {
      actions.getFlashList()
    }
  }, [$flash, actions])

  return { $flash, ...actions }
})

export const useFlash = () => FlashStore()
export const FlashContext = FlashStore.Context
export const FlashProvider = FlashStore.Provider
