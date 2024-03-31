import express from 'express';
import cors from 'cors';
import router from './router';
import globalErrorHandler from './middleware/globalErrorHandler';
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.text())




// apis 
app.use('/api', router)

// golobalerror handle 
app.use(globalErrorHandler)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app