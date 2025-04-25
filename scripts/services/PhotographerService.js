import MediaFactory from "../factories/MediaFactory.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"
import Dropdown from "../utils/Dropdown.js"
import PanelTemplate from "../templates/PanelTemplate.js"
import Lightbox from "../utils/Lightbox.js"

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
        // error if unknown id
        if (!photographer) {
            document.getElementById("main").innerHTML = `
                <div id="photographer-header" class="error">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <h2>Photographe introuvable</h2>
                    <p>Vérifiez l'identifiant dans l'URL.</p>
                </div>
            `.trim()
            return
        }
        // get media if valid id
        const allMediaData = await this._api.getMedia()
        const media = allMediaData
            // only media from photographer
            .filter(media => media.photographerId === photographer.id)
            // split into photos and videos
            .map(media => new MediaFactory(media))
        return { photographer, media }
    }

    displayPhotographersCards(photographers) {
        const $section = document.getElementById("photographer-section")
        // generate cards
        photographers.forEach(photographer => {
            const card = new PhotographerTemplate(photographer).createPhotographerCard()
            $section.appendChild(card)
            // hover animations
            const $photographer = document.getElementById(`${photographer.id}`)
            const $photographerPicture = $photographer.querySelector(".photographer-picture")
            $photographer.addEventListener("mouseenter", () => {
                $photographerPicture.classList.add("active")
                $photographerPicture.classList.remove("inactive")
            })
            $photographer.addEventListener("mouseleave", () => {
                $photographerPicture.classList.add("inactive")
                $photographerPicture.classList.remove("active")
            })
        })
        return $section
    }

    displayPhotographerMedia(photographer, mediaList) {
        function displayMedia(mediaList) {
            const $section = document.getElementById("media-section")
            $section.innerHTML = ""
            // generate media
            mediaList.forEach(media => {
                const mediaElement = media.createMedia()
                $section.appendChild(mediaElement)
                // hover animations
                const $media = document.getElementById(`${media.id}`)
                const $mediaElement = $media.querySelector(".media-element")
                $media.addEventListener("mouseenter", () => {
                    $mediaElement.classList.add("active")
                    $mediaElement.classList.remove("inactive")
                })
                $media.addEventListener("mouseleave", () => {
                    $mediaElement.classList.add("inactive")
                    $mediaElement.classList.remove("active")
                })
                // heart icon state
                const $likeIcon = $media.querySelector(".like-icon")
                $likeIcon.classList.add(media.liked ? "fa-solid" : "fa-regular") 
            })
            $section.classList.add("showing")
        }
        displayMedia(mediaList)
        // initialize lightbox, dropdown menu and panel
        new Lightbox(mediaList).init()
        new Dropdown(photographer, mediaList, displayMedia).init()
        new PanelTemplate(photographer, mediaList).init()
    }
}