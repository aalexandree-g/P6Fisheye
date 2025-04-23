import MediaFactory from "../factories/MediaFactory.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"
import Dropdown from "../utils/Dropdown.js"
import { changeClass } from "../utils/helper.js"

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
            // hover animations
            const $photographer = document.getElementById(`${photographer.id}`)
            const $photographerPicture = $photographer.querySelector(".photographer-picture")
            $photographer.addEventListener("mouseenter", () => {
                changeClass($photographerPicture, "active", "inactive")
            })
            $photographer.addEventListener("mouseleave", () => {
                changeClass($photographerPicture, "inactive", "active")
            })
        })
        return $section
    }

    displayPhotographerMedia(photographer, mediaList) {
        function displayMedia(mediaList) {
            const $section = document.getElementById("media-section")
            $section.innerHTML = ""
            mediaList.forEach(media => {
                const mediaElement = media.createMedia()
                $section.appendChild(mediaElement)
                // hover animations
                const $media = document.getElementById(`${media.id}`)
                const $mediaElement = $media.querySelector(".media-element")
                const $likeIcon = $media.querySelector(".like-icon")
                if (media.liked) {
                    changeClass($likeIcon, "fa-solid", "fa-regular")
                } else {
                    changeClass($likeIcon, "fa-regular", "fa-solid")
                }
                $media.addEventListener("mouseenter", () => { changeClass($mediaElement, "active", "inactive") })
                $media.addEventListener("mouseleave", () => { changeClass($mediaElement, "inactive", "active") })
            })
            $section.classList.add("showing")
        }
        displayMedia(mediaList)
        new Dropdown(photographer, mediaList, displayMedia).init()
    }
}