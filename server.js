import express from 'express'
import { db } from './src/config/db.js'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to LinkedIn Profile Tracker API');
});

db.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app