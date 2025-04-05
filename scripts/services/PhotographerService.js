import MediaFactory from "../factories/MediaFactory.js"

export default class PhotographerService {
    constructor(api) {
        this._api = api
    }

    async getPhotographerFromUrl() {
        // get id from url
        const params = new URLSearchParams(window.location.search)
        const id = parseInt(params.get("id"))
        // find photographer with this id
        const photographers = await this._api.getPhotographers()
        return photographers.find(photographer => photographer.id === id)
    }

    async getMediaForPhotographer(photographer) {
        const allMediaData = await this._api.getMedia()
        const photographerMedia = allMediaData.filter(media => media.photographerId === photographer.id)
        return photographerMedia.map(media => new MediaFactory(media))
    }

    displayPhotographerMedia(mediaList) {
        this.$section = document.querySelector(".media_section")
        mediaList.forEach(media => {
            const mediaElement = media.createMedia()
            this.$section.appendChild(mediaElement)
        })
    }
}