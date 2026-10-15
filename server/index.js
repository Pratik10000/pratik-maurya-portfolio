require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))

let ContactMessage
try {
  const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    createdAt: { type: Date, default: Date.now }
  })
  ContactMessage = mongoose.model('ContactMessage', contactSchema)
} catch (error) {
  console.error('Could not define contact model:', error.message)
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'pratik-portfolio-api' }))

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name || !email || !message || name.trim().length < 2 || message.trim().length < 8) {
    return res.status(400).json({ error: 'Please provide a name, valid email, and message of at least 8 characters.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }
  if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1 || !ContactMessage) {
    return res.status(503).json({ error: 'Contact database is not configured.' })
  }
  try {
    await ContactMessage.create({ name: name.trim(), email: email.trim(), message: message.trim() })
    return res.status(201).json({ message: 'Message saved successfully.' })
  } catch (error) {
    console.error('Contact save failed:', error.message)
    return res.status(500).json({ error: 'Unable to save the message right now.' })
  }
})

const clientDist = path.join(__dirname, '..', 'dist')
app.use(express.static(clientDist))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next()
  res.sendFile(path.join(clientDist, 'index.html'), err => err && next(err))
})

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('Connected to MongoDB')
    } catch (error) {
      console.warn('MongoDB connection failed; contact form will use email fallback:', error.message)
    }
  } else {
    console.warn('MONGODB_URI not set; contact form will use email fallback.')
  }
  app.listen(PORT, () => console.log(`Portfolio server listening on http://localhost:${PORT}`))
}
start()
