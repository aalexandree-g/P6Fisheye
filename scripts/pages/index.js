/*import { getPhotographers } from "../utils/api.js"
import { displayUserCards } from "../functions/index.js"

const photographers = await getPhotographers()
displayUserCards(photographers)*/


class App {
    constructor() {
        this.$section = document.querySelector(".photographer_section")
        this.photographersApi = new PhotographersApi("./data/photographers.json")
    }

    async main() {
        const allPhotographers = await this.photographersApi.getPhotographers()
        const photographers = allPhotographers.map(photographer => new Photographer(photographer))

        photographers.forEach(photographer => {
            const template = new PhotographerTemplate(photographer)
            this.$section.appendChild(
                template.createPhotographerCard()
            )
        })
    }
}

const app = new App()
app.main()