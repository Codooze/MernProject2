import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

let restaurants  //stores a referance to our database

//!as soon as our server start we will get a reference to our database.
//si ya hay una referencia retornamos

//- it's used first at index.js line 24
//intentamos tomar la collection restaurants
export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return
    }
    try {
      restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }

  //-to get a list of all the restaurants in the database
  // if "cuisine" is equals $eq:    filters["cuisine"] meaning the cuisine that's passed in
  // $text  is not a text field it's something we have to set up in mongodb atlas
  // if someone does a $text search we have to tell mongodb which specific fields to search for that specific string
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }
    //now we will fing all the restaurants from the database that go along with the query that we passed in
    let cursor
    try {
      cursor = await restaurants.find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 } //returns an empty list and 0 for total number of restaurants
    }
    //if there is no error now we will limit the results cuz the return in the cursor is every single result but
    // we are going to limit by restaurants per page and to get the actual page number we do a skip
    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
    try {
      const restaurantsList = await displayCursor.toArray() //set to an array
      const totalNumRestaurants = await restaurants.countDocuments(query)
      
      return { restaurantsList, totalNumRestaurants }
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }
  }

//- Explanation of the line 29
//if you don't have the = {}, when you call the function you have to pass it a parameter
// with the = {}, you don't
// so you can just call getRestaurants(), and all of the destructured parameters will have their default values


//-min 59
// in the next lines we are trying to get the review from one collection and put it into the restaurant
//import mongodb from "mongodb"
//const ObjectId = mongodb.ObjectId    we add this to have access to the object id

//we create a pipeline is used to match different collections together
static async getRestaurantByID(id){
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$restaurant_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await restaurants.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []
    try {
      cuisines = await restaurants.distinct("cuisine")
      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }
}