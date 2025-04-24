import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"

const api = new PhotographersApi("./data/photographers.json")
const service = new PhotographerService(api)

// get photographer and media
const { photographer, media } = await service.getDataFromUrl()

// display photographer
new PhotographerTemplate(photographer).createPhotographerHeader()

// display media
service.displayPhotographerMedia(photographer, media)