import { GoogleSpreadsheet } from 'google-spreadsheet'
import {
  flashSpreadsheet,
  budgetSpreadsheet,
  flashListSpreadsheet,
  optionsSpreadsheet,
  clientEmail,
  privateKey,
} from './googleData'

const getSpreadsheet = {
  flash: flashSpreadsheet,
  budget: budgetSpreadsheet,
  list: flashListSpreadsheet,
  options: optionsSpreadsheet
}

const createDoc = async operation => {
  const doc = new GoogleSpreadsheet(
    getSpreadsheet[operation]
  )

  await doc.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey,
  })
  await doc.loadInfo()
  return doc
}

export const addInfo = async (operation, payload) => {
  const doc = await createDoc(operation)
  const sheet = await doc.sheetsByIndex[0]
  const response = await sheet.addRow(payload)
  if (response) {
    return true
  }
  return false
}

export const getSpreadsheetInfo = async (operation) => {
  const doc = await createDoc(operation)
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows()
  return rows
}