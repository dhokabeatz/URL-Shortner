// controllers/urlController.js

const validUrl = require('valid-url');
const { saveMapping, getMapping, getAllMappings } = require('../models/urlModel');

// Access the environment variables
const baseUrl = process.env.BASE_URL || 'http://localhost:10000';  // Default to localhost if not set

console.log(process.env.BASE_URL);  // Check if it prints the correct base URL

// Generates shortcode string
function generateShortcode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortcode = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortcode += characters[randomIndex];
  }
  return shortcode;
}

// Controller for showing landing home
function showHomePage(req, res) {
  const recentUrls = getAllMappings();
  res.render('index', { title: "🎄✨ Merry Christmas from Henry! 🎅🎁", recentUrls, shortenedUrl: null });
}

// Controller for shortening the URL
function shortenUrl(req, res) {
  const longURL = req.body.longURL;

  // Validate URL
  if (!validUrl.isUri(longURL)) {
    return res.status(400).send('Invalid URL');
  }

  // Generate a unique shortcode
  const shortcode = generateShortcode();

  // Save the mapping
  saveMapping(shortcode, longURL);

  // Send the shortened URL back to the user
  res.render('index', {
    title: 'URL Shortener',
    recentUrls: getAllMappings(),
    shortenedUrl: `${baseUrl}/${shortcode}`  // Use the BASE_URL here
  });
}

// Controller for redirecting shortcodes
function redirectToOriginalUrl(req, res) {
  const shortcode = req.params.shortcode;
  const longURL = getMapping(shortcode);

  if (longURL) {
    res.redirect(longURL);  // Redirect to original URL
  } else {
    res.status(404).send('Shortcode not found');
  }
}

module.exports = {
  showHomePage,
  shortenUrl,
  redirectToOriginalUrl
};
