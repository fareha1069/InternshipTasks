const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const  userRoutes = require("./routes/user.js")

dotenv.config();

const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//swagger setup

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "My API",
        version: "1.0.0",
        description: "API documentation"
    }
},
apis: ["./src/routes/*.js"]

};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
app.use("/" , userRoutes);


//start server
app.listen(port , ()=>{
    console.log(`server is runnning on port ${port}`);
})