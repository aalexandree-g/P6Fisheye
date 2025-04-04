import PhotographersApi from "../utils/PhotographersApi.js"
import Photo from "../models/Photo.js"
import Video from "../models/Video.js"
import MediaFactory from "../factories/MediaFactory.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"

class PhotographerApp {
    constructor() {
        this.$header = document.querySelector(".photographer_header")
        this.$section = document.querySelector(".media_section")
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
        template.createPhotographerProfile()

        const allMediaData = await this.api.getMedia()
        const photographerMedia = allMediaData.filter(media => media.photographerId === photographerId)
        const allMedia = photographerMedia.map(media => new MediaFactory(media))
        
        allMedia.forEach(media => {
            const mediaElement = media.createMedia()
            this.$section.appendChild(mediaElement)
        })
    }
}

const photographerApp = new PhotographerApp()
photographerApp.main()