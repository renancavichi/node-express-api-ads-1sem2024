const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`)
    if(req.body){
        console.log('Req.Body: ', req.body)
    }
    next()
}

export default logger