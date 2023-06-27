import UserService from '../service/user-service.js'
import { config as dotenvConfig } from 'dotenv';

dotenvConfig()

class UserContoller {
    async registration(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password)
            res.cookie('refreshToken', userData.refresh, {maxage: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res, next){
        try {
            
        } catch (e) {
            
        }
    }

    async logout(req, res, next){
        try {
            
        } catch (e) {
            console.log(e)
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            
        }
    }

    async refresh(req, res, next){
        try {
            
        } catch (e) {
            
        }
    }

    async getUsers(req, res, next){
        try {
            res.json(['123', '456'])
            
        } catch (e) {
            
        }
    }

}


export default new UserContoller()