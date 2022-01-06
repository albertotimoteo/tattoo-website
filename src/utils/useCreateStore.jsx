import * as React from 'react'

const warnNoProvider = () => {
  // tslint:disable-next-line
  console.warn('[useCreateStore] Missing Provider')
}
const canUseProxy =
  process.env.NODE_ENV === 'development' && typeof Proxy !== 'undefined'

const defaultValue = canUseProxy
  ? new Proxy({}, { get: warnNoProvider, apply: warnNoProvider })
  : {}

const useCreateStore = useValue => {
  const Context = React.createContext(defaultValue)

  const Provider = props => {
    const value = useValue(props)

    return <Context.Provider value={value}>{props.children}</Context.Provider>
  }

  const useContext = () => React.useContext(Context)

  useContext.Context = Context

  useContext.Provider = Provider

  return useContext
}

export default useCreateStore
