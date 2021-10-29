import { GoogleSpreadsheet } from 'google-spreadsheet'
import {
  flashSpreadsheet,
  budgetSpreadsheet,
  clientEmail,
  privateKey,
} from './googleData'

const createDoc = async isFlash => {
  const doc = new GoogleSpreadsheet(
    isFlash ? flashSpreadsheet : budgetSpreadsheet
  )

  await doc.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey,
  })
  await doc.loadInfo()
  return doc
}

export const addInfo = async (isFlash, payload) => {
  const doc = await createDoc(isFlash)
  const sheet = await doc.sheetsByIndex[0]
  const response = await sheet.addRow(payload)
  if (response) {
    return true
  }
  return false
}
