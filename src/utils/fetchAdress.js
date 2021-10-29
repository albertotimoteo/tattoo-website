const to = promise =>
  promise
    .then(res => {
      if (res.problem && !res.ok) {
        throw new Error(res.problem)
      }
      return [res, undefined]
    })
    .catch(err => [undefined, err])

export const fetchAddress = async cep => {
  const [response] = await to(fetch(`https://viacep.com.br/ws/${cep}/json/`))
  if (response) {
    return response.json()
  }
  return null
}
