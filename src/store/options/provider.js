import { getSpreadsheetInfo } from '../../utils/sendToSpreadsheet'

export const getData = async () => {
  const rows = await getSpreadsheetInfo('options')
  const data = rows.reduce(
    (accumulator, currentValue) => {
      const {
        dias_flash,
        dias_orcamento,
        horas_flash,
        horas_orcamento,
        meses_flash,
        meses_orcamento,
        tamanhos_orcamento,
        site_liberado,
      } = currentValue
      dias_flash && accumulator.dias_flash.push(dias_flash)
      dias_orcamento && accumulator.dias_orcamento.push(dias_orcamento)
      horas_flash && accumulator.horas_flash.push(horas_flash)
      horas_orcamento && accumulator.horas_orcamento.push(horas_orcamento)
      meses_flash && accumulator.meses_flash.push(meses_flash)
      meses_orcamento && accumulator.meses_orcamento.push(meses_orcamento)
      tamanhos_orcamento && accumulator.tamanhos.push(tamanhos_orcamento)
      if (site_liberado && site_liberado === 's') {
        accumulator.isBooking = true
      }

      return accumulator
    },
    {
      dias_flash: [],
      dias_orcamento: [],
      horas_flash: [],
      horas_orcamento: [],
      meses_flash: [],
      meses_orcamento: [],
      tamanhos: [],
      isBooking: false,
    }
  )

  return data
}
