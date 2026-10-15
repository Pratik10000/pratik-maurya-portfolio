
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  createdAt: { type: Date, default: Date.now }
})

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', contactSchema)

let connectionPromise

async function connectDB() {
  if (mongoose.connection.readyState === 1) return

  if (!process.env.MONGODB_URI) {
    throw new Error('Database is not configured')
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI)
      .catch(error => {
        connectionPromise = null
        throw error
      })
  }

  await connectionPromise
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    name.trim().length < 2 ||
    name.trim().length > 100 ||
    email.trim().length > 200 ||
    message.trim().length < 8 ||
    message.trim().length > 3000
  ) {
    return res.status(400).json({ error: 'Please check your form details.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  try {
    await connectDB()

    await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    })

    return res.status(201).json({ message: 'Message saved successfully.' })
  } catch (error) {
    console.error('Contact API error:', error.message)
    return res.status(500).json({
      error: 'Unable to save your message right now. Please try again later.'
    })
  }
}
