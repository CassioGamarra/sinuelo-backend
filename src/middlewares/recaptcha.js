require("es6-promise").polyfill
require("isomorphic-fetch")
require('dotenv/config');

module.exports = {
  async verify(req, res, next) {
    const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY

    const humanKey = req.headers.captcha; //Token do google

    // Validate Human
    const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: `secret=${RECAPTCHA_SERVER_KEY}&response=${humanKey}`
    }).then(res => res.json())
      .then(json => json.success)
      .catch(err => {
        throw new Error(`Error in Google Siteverify API. ${err.message}`)
      })

    if (humanKey === null || !isHuman) {
      res.json({
        statusCode: 404,
        title: 'error',
        message: 'Por favor, verifique o captcha e tente novamente'
      })
    } else {
      return next();
    }
  }
}