/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import useCreateStore from '../../utils/useCreateStore'
import optionsActions from './actions'

const initialState = {
  dias_flash: [],
  dias_orcamento: [],
  horas_flash: [],
  horas_orcamento: [],
  meses_flash: [],
  meses_orcamento: [],
  tamanhos: [],
  isBooking: false
}

const OptionsStore = useCreateStore(() => {
  const [$options, setOptions] = useState(initialState)
  const actions = optionsActions(setOptions)

  useEffect(() => {
    if (!Object.values($options).some(option => Boolean(option.length))) {
      actions.getOptions()
    }
  }, [$options, actions])

  return { $options, ...actions }
})

export const useOptions = () => OptionsStore()
export const OptionsContext = OptionsStore.Context
export const OptionsProvider = OptionsStore.Provider
