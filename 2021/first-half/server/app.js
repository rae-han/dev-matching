const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const nodes = [
  {
    "id": "5",
    "name": "2021/04",
    "type": "DIRECTORY",
    "filePath": null,
    "parent": {
      "id": "1"
    }
  },
  {
    "id": "19",
    "name": "물 마시는 사진",
    "type": "FILE",
    "filePath": "/images/a2i.jpg",
    "parent": {
      "id": "1"
    }
  }
];

app.use(cors())

app.get('/nodes', (req, res) => {
  res.status(200).json(nodes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})