import { getSpreadsheetInfo } from '../../utils/sendToSpreadsheet'

export const getData = async () => {
  const rows = await getSpreadsheetInfo('list')
  const data = rows.map(row => ({
    name: row.nome,
    price: row.preco,
    picture: row.imagem,
    alternativePicture: row.imagem_alternativa,
    code: row.codigo,
    size: row.tamanho,
  }))

  return data
}
