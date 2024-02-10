
module.exports = {

appSecretCheck: (req, res, next)=>{
  const authHeader = req.headers['authorization']
  if(!authHeader){
    return res.status(400).json({ message: 'No authorization secret was found' })
  }

  if(req.headers.authorization.split(' ')[0] !== 'Bearer'){
    return res.status(400).json({ message: 'No authorization secret was found' })
  }

  if(req.headers.authorization.split(' ').length !== 2){
    return res.status(400).json({ message: 'No authorization secret was found' })
  }

  const appSecret = req.headers.authorization.split(' ')[1]

  if( appSecret !== process.env.APP_SECRET){
    return res.status(400).json({ message: 'Invalid authorization secret was found' })
  }
  next()
}
}
