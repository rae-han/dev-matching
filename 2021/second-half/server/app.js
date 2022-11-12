const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

// app.use(express.static('./'))
// app.use(express.static('../'))
// app.use(express.static('src'))
// app.use(express.static('/src'))
// app.use(express.static('./src'))
// app.use(express.static('src/pages'))


app.get('*', (req, res) => {
  const entryPoint = path.join(__dirname, '..', 'index.html');
  res.sendFile(entryPoint)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})