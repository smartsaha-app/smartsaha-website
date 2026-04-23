import { defineEventHandler, readBody } from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, company, email, mobile, interests, comments } = body

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.CONTACT_EMAIL, 
      pass: process.env.CONTACT_EMAIL_PASS
    }
  })

  const mailOptions = {
    from: `"SmartSaha Contact" <${process.env.CONTACT_EMAIL}>`,
    to: 'ivoandrianah@gmail.com',
    subject: 'SmartSaha Contact Form Submission',
    html: `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
        <h2 style="color: #112830; margin-bottom: 16px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Company:</td>
            <td style="padding: 8px;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Mobile:</td>
            <td style="padding: 8px;">${mobile}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Interests:</td>
            <td style="padding: 8px;">${interests.join(', ')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Comments:</td>
            <td style="padding: 8px;">${comments || 'N/A'}</td>
          </tr>
        </table>
        <p style="margin-top: 16px; font-size: 0.9rem; color: #555;">
          This email was generated automatically by the SmartSaha Contact Form.
        </p>
      </div>
    `
  };
  

  try {
    await transporter.sendMail(mailOptions)
    return { success: true, message: 'Email sent successfully' }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Failed to send email' }
  }
})
