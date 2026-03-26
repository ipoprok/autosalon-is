const path = require('path')
const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const PORT = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, 'services.db')
const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Failed to connect SQLite:', error.message)
    return
  }
  console.log('SQLite connected:', dbPath)
})

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS service_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_type TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/service-requests', (req, res) => {
  const { requestType, fullName, phone, email } = req.body || {}

  if (!requestType || !fullName || !phone || !email) {
    return res.status(400).json({ message: 'Все поля обязательны: requestType, fullName, phone, email.' })
  }

  const allowedTypes = ['test-drive', 'service']
  if (!allowedTypes.includes(requestType)) {
    return res.status(400).json({ message: 'Некорректный тип заявки.' })
  }

  const insertSql = `
    INSERT INTO service_requests (request_type, full_name, phone, email)
    VALUES (?, ?, ?, ?)
  `

  db.run(insertSql, [requestType, fullName, phone, email], function onInsert(error) {
    if (error) {
      return res.status(500).json({ message: 'Ошибка сохранения заявки.' })
    }

    return res.status(201).json({
      id: this.lastID,
      message: 'Заявка сохранена.'
    })
  })
})

app.get('/api/service-requests', (_req, res) => {
  db.all(
    `
      SELECT id, request_type AS requestType, full_name AS fullName, phone, email, created_at AS createdAt
      FROM service_requests
      ORDER BY id DESC
    `,
    [],
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Ошибка получения заявок.' })
      }
      return res.json(rows)
    }
  )
})

app.listen(PORT, () => {
  console.log(`Backend API is running on http://localhost:${PORT}`)
})
