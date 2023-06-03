const translations = require('./models/translations');

function localize(key, lang) {
  return translations[lang][key];
}

module.exports = (req, res, next) => {
  // Set the default language preference
  req.app.locals.lang = 'en';

  // Add the localize function to res.locals
  res.locals.localize = localize;

  next();
};
