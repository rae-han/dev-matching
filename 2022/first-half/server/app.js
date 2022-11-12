const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const languages = ['java', 'javascript', 'typescript', 'kotlin', 'c', 'c++', 'python'];

app.use(cors())

app.get('/languages', (req, res) => {
  res.status(200).json(languages)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})