import {UserModel} from "../../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
        const passwordHash = await bcrypt.hash(req.body.password, salt)

        const register = await UserModel.create({
            login: req.body.login,
            email: req.body.email,
            password: passwordHash
        })

        const token = jwt.sign(
            {id: register.id},
            process.env.SECRET_KEY,
            {expiresIn: '30d'}
        )

        const {password, id, createdAt, ...userData} = register.dataValues

        res.json({
            token,
            ...userData
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to register'
        })
    }
}