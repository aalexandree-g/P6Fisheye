import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"

class PhotographerApp {
    constructor() {
        this.api = new PhotographersApi("./data/photographers.json")
        this.service = new PhotographerService(this.api)
    }

    async main() {
        // get photographer and media
        const photographer = await this.service.getPhotographerFromUrl()
        const media = await this.service.getMediaForPhotographer(photographer)
        // display photographer
        const header = new PhotographerTemplate(photographer)
        header.createPhotographerHeader()
        // display media
        this.service.displayPhotographerMedia(media)


        // afficher l'encart

        
    }
}

const photographerApp = new PhotographerApp()
photographerApp.main()