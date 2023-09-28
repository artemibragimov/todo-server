import { UserModel } from "../../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
        const passwordHash = await bcrypt.hash(req.body.password, salt)

        const user = await UserModel.create({
            login: req.body.login,
            email: req.body.email,
            password: passwordHash
        })

        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        )

        res.json({ token })
    } catch (err) {
        res.status(500).json({
            message: 'A user with this login or email already exists'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            where: {
                login: req.body.login
            }
        })

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.password)

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        )

        res.json({ token })
    } catch (err) {
        res.status(500).json({
            message: 'Invalid email or password'
        })
    }
}

export const me = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            where: {
                id: req.id
            }
        })

        const { login, email, createdAt, ...userData } = user

        res.json({
            login: login,
            email: email,
            createdAt: createdAt
        })

    } catch (err) {
        return res.status(404).json({
            message: 'Пользователь не найден'
        })
    }
}