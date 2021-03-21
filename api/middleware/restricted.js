const jwt =  require('jsonwebtoken')

module.exports = (req, res, next) => {
  // next();
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
 try {

  const token = req.headers.authorization
  
    // const token = req.cookies.token
    console.log('token: ', token)
  
    if(!token) {
      return res.status(401).json({
        message: "token required"
      })
    }
  
    jwt.verify(token, 'very secret', (err, decoded) => {
      if(err) {
        return res.status(401).json({
          message: "token invalid"
        })
      }
      req.token = decoded
  
      next()
    })
  
  
  
   } catch(err) {
     next(err)
   }
};
