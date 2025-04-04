import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"

class IndexApp {
    constructor() {
        this.$section = document.querySelector(".photographer_section")
        this.api = new PhotographersApi("./data/photographers.json")
    }

    async main() {
        const photographers = await this.api.getPhotographers()
        photographers.forEach(photographer => {
            const template = new PhotographerTemplate(photographer)
            this.$section.appendChild(
                template.createPhotographerCard()
            )
        })
    }
}

const indexApp = new IndexApp()
indexApp.main()