import nodemailer from 'nodemailer'
import { config as dotenvConfig } from 'dotenv';

dotenvConfig()

class MailService {

    constructor(){
        console.log('!!!!', process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USER, process.env.SMTP_PASSWORD)
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation',
            text: '',
            html: 
            `
                <div>
                    <h1>Click on the link to activate your account</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

export default new MailService()