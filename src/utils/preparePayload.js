const translator = {
  seg: 'segunda-feira',
  ter: 'terça-feira',
  qui: 'quinta-feira',
  sex: 'sexta-feira',
  sab: 'sábado',
  out: 'Outubro',
  nov: 'Novembro',
  dez: 'Dezembro',
  jan: 'Janeiro',
  ten: '10h',
  fourteen: '14h',
  sixteen: '16h',
  thirteen: '13h',
}

export const prepareFlashPayload = (formData, nome) => ({
  nome: formData.nome,
  email: formData.email,
  cpf: formData.cpf,
  nome_flash: nome,
  dia_preferido: textTransformObjectInfo(formData.preferredDay),
  mes_preferido: textTransformObjectInfo(formData.preferredMonth),
  hora_preferida: textTransformObjectInfo(formData.preferredHour),
  cep: formData.address.cep,
  rua: formData.address.street,
  numero: formData.address.number,
  bairro: formData.address.neighborhood,
  cidade: formData.address.city,
  estado: formData.address.state,
  complemento: formData.address.complement,
  local_corpo: formData.bodyPlacement,
})

export const prepareBudgetPayload = (formData) => ({
  nome: formData.nome,
  email: formData.email,
  cpf: formData.cpf,
  dia_preferido: textTransformObjectInfo(formData.preferredDay),
  mes_preferido: textTransformObjectInfo(formData.preferredMonth),
  hora_preferida: textTransformObjectInfo(formData.preferredHour),
  cep: formData.address.cep,
  rua: formData.address.street,
  numero: formData.address.number,
  bairro: formData.address.neighborhood,
  cidade: formData.address.city,
  estado: formData.address.state,
  complemento: formData.address.complement,
  ideia_tattoo: formData.tatooIdea,
  tipo_tattoo: formData.tatooType,
  tamanho_tattoo: formData.tatooSize,
  tamanho_outro: formData.otherSize,
  local_corpo: formData.bodyPlacement,
  local_outro: formData.otherPlacement,
})

const textTransformObjectInfo = infoObj => {
  const keys = Object.keys(infoObj)
  return keys.reduce((acc, currentValue) => {
    if (infoObj[currentValue] === 'sim') {
      return acc + ` ${translator[currentValue]}`
    }
    return acc
  }, '')
}
