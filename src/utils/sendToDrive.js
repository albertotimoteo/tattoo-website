import credsServiceUser from '../utils/google_credentials.json'
import {imagesDriveFolder} from '../utils/googleData'
const NodeGoogleDrive = require('google-drive-connect')
const fileToArrayBuffer = require('file-to-array-buffer')

export const uploadFiles = async (nome, cpf, fileList) => {
  if (!fileList.length) return

  const filesNames = []
  const filesTypes = []

  for (let i = 0; i < fileList.length; i++) {
    let file = fileList.item(i)
    filesNames.push(`${nome}-${cpf}-referencia-${i + 1}`)
    filesTypes.push(file.type.split('/')[1])
  }

  const googleDriveInstance = new NodeGoogleDrive({
    ROOT_FOLDER: imagesDriveFolder,
  })

  await googleDriveInstance.useServiceAccountAuth(credsServiceUser)

  const uploadResponses = []

  try {
    filesNames.forEach(async (fileName, index) => {
      let file = fileList.item(index)
      let fileBuffer = await fileToArrayBuffer(file)
      const uploadResponse = await googleDriveInstance.create({
        source: fileBuffer,
        name: `${fileName}.${filesTypes[index]}`,
        parentFolder: imagesDriveFolder,
        mimeType: `image/${filesTypes[index]}`,
      })
      uploadResponses.push(uploadResponse)
    })
    return true
  }
  catch {
    return false
  }
}
