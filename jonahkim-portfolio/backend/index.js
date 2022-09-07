const express = require('express')

// setup express
const app = express()
const port = process.env.PORT || 3000


// set up listening
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})