import express from 'express'
import profileRoutes from './routes/profileRoutes.js'
import app from '../server.js'

const router = express.Router()
app.use('/api', profileRoutes)


router.get('/', (req, res) => {
    res.send('profile router');
})

export default router