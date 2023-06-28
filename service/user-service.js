import UserSchema from "../models/user-model.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import MailService from "./MailService.js"
import TokenService from "./TokenService.js"
import UserDto from "../dtos/UserDto.js"
import ApiError from "../exceptions/api-error.js";

class UserService {
    async registration(email, password){
        const candidate = await UserSchema.findOne({email})
        if(candidate){
            throw ApiError.BadRequest(`The ${email} has already existed`)
        }
        const hashPasswort = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()
        const user = await UserSchema.create({email, password: hashPasswort, activationLink})
        await MailService.sendActivationMail(email, `${process.env.LINK_API}/api/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink){
        const user = await UserSchema.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Incorrect link')
        }

        user.isActivated = true
        await user.save()
    }
}


export default new UserService()