import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"

const api = new PhotographersApi("./data/photographers.json")
const service = new PhotographerService(api)

// get photographers
const photographers = await api.getPhotographers()

// display photographers
service.displayPhotographersCards(photographers)