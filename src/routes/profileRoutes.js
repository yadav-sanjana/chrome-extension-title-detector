import express from 'express'
import { ProfileController } from "../controller/profiles.js";

const router = express.Router()

// creating profiles
router.post('/profile', ProfileController.createProfile)
router.get('/profile', ProfileController.getProfile)

export default router

