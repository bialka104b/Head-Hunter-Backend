import * as express from 'express'
import * as cors from 'cors'
import {globalErrorHandler} from './utils/globalErrorHandler';

const app = express();
const port = process.env.PORT || 8080;

// Apply CORS policy
app.use(cors())

// Global error handler:
app.use(globalErrorHandler);

// Assign the PORT 8080 lub IP serwera to our app
app.listen(port, () => console.log(`Server Running on port: http://localhost:${port}`));
