import { ProfileModel } from "../models/linkedinProfile.js";

export const ProfileController = {
    async createProfile(req, res) {
        try {

            const newProfile = await ProfileModel.create({
                ...req.body
            })

            // Sending response
            res.status(201).send(newProfile)

        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Server Error'
            })
        }
    },

    async getProfile(req, res) {
        try {
            const profiles = await ProfileModel.findAll({})

            res.send(profiles)
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Server Error'
            })
        }
    }

}
