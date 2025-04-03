/*import { getPhotographers, getMedia } from "../utils/api.js"
import { getPhotographerFromId, displayUserProfile, displayMedia } from "../functions/photographer.js"

const photographers = await getPhotographers()
const photographer = getPhotographerFromId(photographers)
displayUserProfile(photographer)

const media = await getMedia()
displayMedia(photographer,media)*/




class App {
    constructor() {
        this.$main = document.getElementById("main")
        this.photographersApi = new PhotographersApi("./data/photographers.json")
    }

    async main() {
        const allPhotographers = await this.photographersApi.getPhotographers()
        const allMedia = await this.photographersApi.getMedia()

        const photographers = allPhotographers.map(photographer => new Photographer(photographer))

        photographers.forEach(photographer => {
            const template = new PhotographerTemplate(photographer)
            this.$main.appendChild(
                template.createPhotographerProfile()
            )
        })
    }
}

const app = new App()
app.main()