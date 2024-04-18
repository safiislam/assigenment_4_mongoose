import express from 'express';
import cors from 'cors';
import router from './App/router';
import globalErrorHandler from './App/middleware/globalErrorHandler';
import notFound from './App/middleware/notFound';
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.text())




// apis 
app.use('/api', router)

// golobalerror handle 
app.use(globalErrorHandler)

app.use(notFound)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app