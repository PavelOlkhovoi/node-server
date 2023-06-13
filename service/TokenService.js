import jwt from "jsonwebtoken"
import tokenModel from "../models/token-model"

class TokenService {
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30min'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(useId, refreshToken){
        const tokenData = await tokenModel.findOne({user: useId})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await tokenModel.create({user: useId, refreshToken})
        return token
    }
}

export default new TokenService