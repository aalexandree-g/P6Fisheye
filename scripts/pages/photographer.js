import PhotographersApi from "../utils/PhotographersApi.js"
import PhotographerService from "../services/PhotographerService.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"
import PanelTemplate from "../templates/PanelTemplate.js"

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

        media.forEach(m => {
            const $media = document.getElementById(`${m.id}`)
            const $likes = $media.querySelector(".likes_section")

            $likes.addEventListener("click", () => {
                const newLikes = m.increaseLikes()
                $media.querySelector(".media_likes").textContent = newLikes
            })
        })
    }
}

new PhotographerApp().main()