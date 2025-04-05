import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"
import Photo from "../models/Photo.js"
import Video from "../models/Video.js"
import MediaFactory from "../factories/MediaFactory.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"

class PhotographerApp {
    constructor() {
        this.$encart = document.querySelector(".encart")
        this.api = new PhotographersApi("./data/photographers.json")
    }

    async main() {

        // get photographer from URL and his/her media
        const service = new PhotographerService(this.api)
        const photographer = await service.getPhotographerFromUrl()
        const media = await service.getMediaForPhotographer(photographer)
        
        // display profile
        const template = new PhotographerTemplate(photographer)
        template.createPhotographerHeader()

        // display media
        service.displayPhotographerMedia(media)


        // afficher l'encart

        
    }
}

const photographerApp = new PhotographerApp()
photographerApp.main()