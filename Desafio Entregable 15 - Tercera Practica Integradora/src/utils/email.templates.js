import fs from 'fs'
import path from 'path'

export const emailForRecoveryPassowrd = async (token) => {
  const html = fs.readFileSync(path.resolve('src/utils/emails/recoveryPasword.html'), 'utf-8')
  return html.replace("<<token>>", token)
}