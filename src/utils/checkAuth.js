import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ')[1]
    if (token) {
        try {

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.id = decoded.id
            next()
        } catch (err) {
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }
}