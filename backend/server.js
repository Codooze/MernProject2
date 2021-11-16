import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants) //this is going to be the url people will go to
//the second argument you past is the route in this case restaurants
app.use("*", (req, res) => res.status(404).json({ error: "not found" })) // por si alguien va a una ruta que no existe
//retorna "not found"

//-Export app as a madule to import it in the file that acces the database
//witch will be the file that you run to get the server running
export default app