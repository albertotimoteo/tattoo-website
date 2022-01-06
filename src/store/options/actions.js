import { getData } from "./provider"

const actions = setOptions => {
  const getOptions = async () => {
    const data = await getData()
    setOptions(data)
  }

  return {
    getOptions
  }
}

export default actions