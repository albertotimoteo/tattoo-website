import { getData } from "./provider"

const actions = setFlash => {
  const getFlashList = async () => {
    const data = await getData()
    setFlash(data)
  }

  return {
    getFlashList
  }
}

export default actions