import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"

const api = new PhotographersApi("./data/photographers.json")
const service = new PhotographerService(api)

// get photographer and media
const result = await service.getDataFromUrl()

// unknown id
if (!result) {
    console.log("L'id ne correspond à aucun photographe.")

// display photographer and media
} else {
    const { photographer, media } = result
    new PhotographerTemplate(photographer).createPhotographerHeader()
    service.displayPhotographerMedia(photographer, media)
}