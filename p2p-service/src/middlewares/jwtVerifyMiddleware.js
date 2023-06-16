const { jwtVerify, createRemoteJWKSet } = require('jose');

const jwks = createRemoteJWKSet(new URL("https://api.openlogin.com/jwks"));

async function jwtVerifyMiddleware(req, res, next) {
  const idToken = req.headers.authorization?.split(' ')[1];
  console.log(req.headers)

  try {
    const jwtDecoded = await jwtVerify(idToken, jwks, { algorithms: ["ES256"] });

    req.user = jwtDecoded.payload;

    // Verified, proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or missing token' });
  }
}

module.exports = jwtVerifyMiddleware;
