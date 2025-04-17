import MediaFactory from "../factories/MediaFactory.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"

export default class PhotographerService {
    constructor(api) {
        this._api = api
    }

    async getDataFromUrl() {
        // get id from url
        const params = new URLSearchParams(window.location.search)
        const id = parseInt(params.get("id"))
        // get photographer with this id
        const photographers = await this._api.getPhotographers()
        const photographer = photographers.find(photographer => photographer.id === id)
        // get media
        const allMediaData = await this._api.getMedia()
        const media = allMediaData
            .filter(media => media.photographerId === photographer.id)  // only media from photographer
            .map(media => new MediaFactory(media))                      // split into photos and videos
        return { photographer, media }
    }

    displayPhotographersCards(photographers) {
        const $section = document.getElementById("photographer-section")
        photographers.forEach(photographer => {
            const card = new PhotographerTemplate(photographer).createPhotographerCard()
            $section.appendChild(card)
        })
        return $section
    }

    displayPhotographerMedia(mediaList) {
        const $section = document.getElementById("media-section")
        mediaList.forEach(media => {
            const mediaElement = media.createMedia()
            $section.appendChild(mediaElement)
        })
    }
}