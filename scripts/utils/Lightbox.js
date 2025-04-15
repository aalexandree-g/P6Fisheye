import PhotoTemplate from "../templates/PhotoTemplate.js"

export default class Lightbox {
    constructor(media) {
        this._media = media
        this.$content = document.querySelector(".main-content")
        this.$lightbox_media = document.getElementById("lightbox_media")
        this.$lightbox = document.querySelectorAll(".lightbox, .background")
        this.init()
    }

    displayLightbox() {
        this.$lightbox.forEach(element => {
            element.classList.add("visible", "showing")
        })
        this.$content.setAttribute("inert", "")
    }

    closeLightbox() {
        this.$lightbox.forEach(element => {
            element.classList.remove("showing")
            element.classList.add("hiding")
            setTimeout(() => {
                element.classList.remove("visible", "hiding")
            }, 250)
        })
        this.$content.removeAttribute("inert")
    }

    init() {
        // open lightbox
        this._media.forEach(media => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".media_element").addEventListener("click", () => {
                media.createLightbox()
                this.displayLightbox()
            })
        })
        // close lightbox
        document.addEventListener("click", (e) => {
            if (e.target.matches(".lightbox .close-btn") || e.target.matches("body")) { this.closeLightbox() }
        })
        // keypress to close modal
        this.$close_btn = document.querySelector(".close-btn")
        document.addEventListener("keydown", (e) => {
            if (
                e.key === "Escape" ||
                ((e.key === "Enter" || e.key === " ") && document.activeElement === this.$close_btn)
            ) {
                e.preventDefault()
                this.closeLightbox()
                }
        })

    }
}