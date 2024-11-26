require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const { showHomePage, shortenUrl, redirectToOriginalUrl } = require('./controllers/urlController')

const app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static('public'))

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Routes
app.get('/', showHomePage) // Main page with the form
app.post('/shorten', shortenUrl) // Post request to shorten URL
app.get('/:shortcode', redirectToOriginalUrl) // Redirect to original URL via shortcode

console.log(process.env.BASE_URL);  // Check if it prints the correct base URL

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
