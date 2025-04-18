import MediaFactory from "../factories/MediaFactory.js"
import PanelTemplate from "../templates/PanelTemplate.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"
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
            $photographer.addEventListener("mouseenter", () => {
                $photographer.querySelector(".photographer-picture").classList.add("active")
                $photographer.querySelector(".photographer-picture").classList.remove("inactive")
            })
            $photographer.addEventListener("mouseleave", () => {
                $photographer.querySelector(".photographer-picture").classList.add("inactive")
                $photographer.querySelector(".photographer-picture").classList.remove("active")
            })
        })
        return $section
    }

    displayPhotographerMedia(photographer, mediaList) {
        const $section = document.getElementById("media-section")

        function displayMedia(mediaList) {
            $section.innerHTML = ""
            mediaList.forEach(media => {
                const mediaElement = media.createMedia()
                $section.appendChild(mediaElement)
                // hover animations
                const $media = document.getElementById(`${media.id}`)
                const $likeIcon = $media.querySelector(".like-icon")
                if (media.liked) {
                    $likeIcon.classList.remove("fa-regular")
                    $likeIcon.classList.add("fa-solid")
                } else {
                    $likeIcon.classList.remove("fa-solid")
                    $likeIcon.classList.add("fa-regular")
                }
                $media.addEventListener("mouseenter", () => {
                    $media.querySelector(".media-element").classList.add("active")
                    $media.querySelector(".media-element").classList.remove("inactive")
                })
                $media.addEventListener("mouseleave", () => {
                    $media.querySelector(".media-element").classList.add("inactive")
                    $media.querySelector(".media-element").classList.remove("active")
                })
            })
            $section.classList.add("showing")
        }

        function sortAndDisplay(type) {
            $section.classList.add("hiding")
            setTimeout(() => {
                $section.classList.remove("hiding")
                if (type === "popularity") {
                    mediaList.sort( (a, b) => b.likes - a.likes)
                } else if (type === "title") {
                    mediaList.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }))
                }
                displayMedia(mediaList)
                new PanelTemplate(photographer, mediaList).setupEventListeners()
                new Lightbox(mediaList).setupEventListeners()
            }, 500)
        }

        displayMedia(mediaList)
        document.querySelector(".popularity").addEventListener("click", () => { sortAndDisplay("popularity") })
        document.querySelector(".title").addEventListener("click", () => { sortAndDisplay("title") })
    }
}