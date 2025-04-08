import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"
import PanelTemplate from "../templates/PanelTemplate.js"
import ContactForm from "../utils/contactForm.js"

class PhotographerApp {
    constructor() {
        this.api = new PhotographersApi("./data/photographers.json")
        this.service = new PhotographerService(this.api)
    }

    async main() {
        // get photographer and media
        const { photographer, media} = await this.service.getDataFromUrl()
        // display photographer and media
        new PhotographerTemplate(photographer).createPhotographerHeader()
        this.service.displayPhotographerMedia(media)
        // display panel
        new PanelTemplate(photographer, media).createPanel()

        const form = new ContactForm()
        form.init()
    }
}

new PhotographerApp().main()