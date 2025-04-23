import MediaFactory from "../factories/MediaFactory.js"
import PanelTemplate from "../templates/PanelTemplate.js"
import PhotographerTemplate from "../templates/PhotographerTemplate.js"
import Lightbox from "../utils/Lightbox.js"
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
        const $section = document.getElementById("media-section")
        const $buttons = document.querySelectorAll(".sort-btn")
        const $noChoiceBtn = document.querySelector(".noChoice")
        const $popularityBtn = document.querySelector(".popularity")
        const $titleBtn = document.querySelector(".title")

        function displayMedia(mediaList) {
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

        function btnEvent(type) {
            const $activeBtn = type === "popularity" ? $popularityBtn : $titleBtn
            const $inactiveBtn = type === "popularity" ? $titleBtn : $popularityBtn
            const direction = type === "popularity" ? "column" : "column-reverse"

            if (!$inactiveBtn.classList.contains("visible")) {
                changeClass($inactiveBtn, "visible", "hidden")
                $noChoiceBtn.classList.add("hidden")
                document.querySelector(".buttons").style.flexDirection = direction
                $activeBtn.setAttribute("aria-expanded", "true")
                
            } else {
                changeClass($inactiveBtn, "hidden", "visible")
                changeClass($noChoiceBtn, "hidden", "visible")
                changeClass($activeBtn, "visible", "hidden")

                $noChoiceBtn.removeAttribute("aria-haspopup")
                $noChoiceBtn.removeAttribute("aria-expanded")
                $noChoiceBtn.setAttribute("aria-selected", "false")

                $activeBtn.setAttribute("aria-haspopup", "true")
                $activeBtn.setAttribute("aria-expanded", "false")
                $activeBtn.setAttribute("aria-selected", "true")

                $inactiveBtn.removeAttribute("aria-haspopup")
                $inactiveBtn.removeAttribute("aria-expanded")
                $inactiveBtn.setAttribute("aria-selected", "false")

                sortAndDisplay(type)
            }
        }

        displayMedia(mediaList)

        $noChoiceBtn.addEventListener("click", () => {
            $buttons.forEach($button => {
                if (!$button.classList.contains("visible")) {
                    changeClass($button, "visible", "hidden")
                    $noChoiceBtn.setAttribute("aria-expanded", "true")
                    $noChoiceBtn.setAttribute("aria-selected", "true")
                } else {
                    changeClass($button, "hidden", "visible")
                    changeClass($noChoiceBtn, "visible", "hidden")
                    $noChoiceBtn.setAttribute("aria-expanded", "false")
                    $noChoiceBtn.setAttribute("aria-selected", "true")
                }
            })
        })

        $popularityBtn.addEventListener("click", () => { btnEvent("popularity") })
        $titleBtn.addEventListener("click", () => { btnEvent("title") })
    }
}