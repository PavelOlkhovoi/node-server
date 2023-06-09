import UserService from '../service/user-service.js'
import { config as dotenvConfig } from 'dotenv';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';

dotenvConfig()

class UserContoller {
    async registration(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('validation error', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password)
            res.cookie('refreshToken', userData.refresh, {maxage: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next){
        try {
            
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next){
        try {
            
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next){
        try {
            
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next){
        try {
            res.json(['123', '456'])
            
        } catch (e) {
            next(e)
        }
    }

}


export default new UserContoller()