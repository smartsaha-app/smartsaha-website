import { defineEventHandler, readBody } from 'h3'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, company, email, mobile, interests, comments } = body

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { data, error } = await resend.emails.send({
      from: 'SmartSaha <no-reply@smart-saha.com>',
      to: ["smartsahaapp@gmail.com"],
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
    })

    if (error) {
      console.error('Resend Error:', error)
      return { success: false, message: 'Failed to send email' }
    }

    return { success: true, message: 'Email sent successfully', data }
  } catch (err) {
    console.error('System Error:', err)
    return { success: false, message: 'Failed to send email' }
  }
})
