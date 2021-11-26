import http from "../http-coommon";

//aqui tendremos todas las funciones  que harán api calls y retornaran su información 
//Http requests
class RestaurantDataService{
    getAll(page = 0) {
    return http.get(`?page=${page}`); //toma la url base + alguna otra pagina
  }

  get(id) {
    return http.get(`/id/=${id}`);// la url base con /id/ la id
  }

  find(query, by = "name", page = 0) {  //query o lo que estariamos usando como termino de busqueda cuisine,name etc
                    // by = estaras buscando ya sea por name cuisine or zipcode
    return http.get(`?${by}=${query}&page=${page}`); //esto seria lo que añadiria al final de la url base
  } 

  createReview(data) {
    return http.post("/review", data); //post request con los datos  review-new
  }

  updateReview(data) {
    return http.put("/review", data); // review-edit
  }

  deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`, {data:{user_id: userId}}); //review-delete
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();