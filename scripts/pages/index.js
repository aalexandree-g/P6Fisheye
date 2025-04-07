import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"

class IndexApp {
    constructor() {
        this.api = new PhotographersApi("./data/photographers.json")
        this.service = new PhotographerService(this.api)
    }

    async main() {
        // get photographers
        const photographers = await this.api.getPhotographers()
        // display photographers
        this.service.displayPhotographersCards(photographers)
    }
}

new IndexApp().main()