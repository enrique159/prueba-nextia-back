import SG, { MailDataRequired } from '@sendgrid/mail'
import finishSlash from '@/utils/finishSlash'

const SG_KEY = process.env.SENDGRID_API_KEY
const SG_FROM = process.env.SENDGRID_FROM
const SG_TEMPLATE_RECOVER_PASS = process.env.SENDGRID_TEMPLATE_ID
const SG_CALLBACK_URL = process.env.SENDGRID_CALLBACK_URL

SG.setApiKey(SG_KEY)

export const sendEmail = async(payload: MailDataRequired): Promise<void> => {
  await SG.send(payload)
}

export const sendRecoverPassEmail = async(to: string, token: string) => {
  const msg: MailDataRequired = {
    to,
    from: SG_FROM,
    subject: 'RECUPERACIÓN DE CONTRASEÑA',
    templateId: SG_TEMPLATE_RECOVER_PASS,
    personalizations: [
      {
        to: [ { email: to } ],
        dynamicTemplateData: {
          callbackUrl: finishSlash(SG_CALLBACK_URL) + token,
        },
      },
    ],
  }

  const response = await sendEmail(msg)
    .then(() => {
      console.log('server⚡️]: Email sended')
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })
  return response
}