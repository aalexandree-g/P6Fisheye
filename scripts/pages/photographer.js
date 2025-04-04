import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"

class PhotographerApp {
    constructor() {
        this.$main = document.getElementById("main")
        this.api = new PhotographersApi("./data/photographers.json")
    }

    async main() {
        // get id from url
        const params = new URLSearchParams(window.location.search)
        const photographerId = parseInt(params.get("id"))

        // find photographer with this id
        const photographers = await this.api.getPhotographers()
        const photographer = photographers.find(photographer => photographer.id === photographerId)

        // create photographer's profile
        const template = new PhotographerTemplate(photographer)
        this.$main.appendChild(
            template.createPhotographerProfile()
        )


        const allMedia = await this.api.getMedia()
    }
}

const photographerApp = new PhotographerApp()
photographerApp.main()