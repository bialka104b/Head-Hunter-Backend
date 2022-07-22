import * as express from "express";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import "./authentication/JwtStrategy";

const app = express();
const port = process.env.PORT || 8080;

// Apply CORS policy
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

// Assign the PORT 8080 lub IP serwera to our app
app.listen(port, () => console.log(`Server Running on port: http://localhost:${port}`));
