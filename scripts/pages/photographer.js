import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"
import EncartTemplate from "../templates/EncartTemplate.js"

class PhotographerApp {
    constructor() {
        this.api = new PhotographersApi("./data/photographers.json")
        this.service = new PhotographerService(this.api)
    }

    async main() {
        // get photographer and media
        const photographer = await this.service.getPhotographerFromUrl()
        const media = await this.service.getMediaForPhotographer(photographer)

        // display photographer and media
        const header = new PhotographerTemplate(photographer)
        header.createPhotographerHeader()
        this.service.displayPhotographerMedia(media)

        // display panel
        const likes = this.service.getTotalLikes(media)
        const panel = new EncartTemplate(photographer)
        panel.createPanel(likes)
    }
}

const photographerApp = new PhotographerApp()
photographerApp.main()