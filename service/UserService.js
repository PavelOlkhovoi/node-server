import UserModel from "../models/user-model"
import bcrypt from "bcrypt"
import uuid from "uuid"
import MailService from "./MailService"
import TokenService from "./TokenService"
import UserDto from "../dtos/UserDto"

class UserService {
    async registration(email, password){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw new Error(`The ${email} has already existed`)
        }
        const hashPasswort = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email, password: hashPasswort, activationLink})
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