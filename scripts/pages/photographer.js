import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"
import PanelTemplate from "../templates/PanelTemplate.js"
import ContactForm from "../utils/ContactForm.js"
import Lightbox from "../utils/Lightbox.js"

class PhotographerApp {
    constructor() {
        this.api = new PhotographersApi("./data/photographers.json")
        this.service = new PhotographerService(this.api)
    }

    async main() {
        // get photographer and media
        const { photographer, media } = await this.service.getDataFromUrl()
        // display photographer and media
        new PhotographerTemplate(photographer).createPhotographerHeader()
        this.service.displayPhotographerMedia(photographer, media)
        // display panel
        new PanelTemplate(photographer, media).init()
        // create modal
        new ContactForm(photographer).init()
        // create lightbox
        new Lightbox(media).init()
    }
}

new PhotographerApp().main()