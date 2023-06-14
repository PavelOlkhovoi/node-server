import UserSchema from "../models/user-model.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import MailService from "./MailService.js"
import TokenService from "./TokenService.js"
import UserDto from "../dtos/UserDto.js"

class UserService {
    async registration(email, password){
        const candidate = await UserSchema.findOne({email})
        if(candidate){
            throw new Error(`The ${email} has already existed`)
        }
        const hashPasswort = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()
        const user = await UserSchema.create({email, password: hashPasswort, activationLink})
        await MailService.sendActivationMail(email, activationLink)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}


export default new UserService()