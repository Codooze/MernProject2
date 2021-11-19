import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()//to load enviroment variables
const MongoClient = mongodb.MongoClient //access our mongo client from mongodb

const port = process.env.PORT || 8000//set port form our envarairoment variable, we pass PORT cuz that's what we have in our env

//-connecto to database
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        //! poolSize: 50, //we want to make it tht only 50 people connect at the time NO SOPORTADA
        wtimeoutMS: 2500, //after 2500 milliseconds the request will time-out 
        useNewUrlParser: true //blabla not need to know just put this
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await RestaurantsDAO.injectDB(client) //reference to the restaurants collection in the database
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => { console.log(`listening on port ${port}`) })
})
//app.listen() is how we start our webserver