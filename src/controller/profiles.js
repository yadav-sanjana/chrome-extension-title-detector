import { ProfileModel } from "../models/linkedinProfile.js";

export const ProfileController = {
    async createProfile(req, res) {
        try {
            const alreadyExist = await ProfileModel.findOne({
                where : {
                    url : req.body.url
                }
            })

            if (alreadyExist) {
                return res.status(400).send({
                    message : "profile already exists"
                })
            }
            const {name,url,about, bio, location, followerCount, connectionCount} = req.body
            const newProfile = await ProfileModel.create({
                name,
                url,
                about,
                bio,
                location,
                followerCount,
                connectionCount
            })
            console.log(req.body)

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
