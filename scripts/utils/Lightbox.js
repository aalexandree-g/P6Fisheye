import PhotoTemplate from "../templates/PhotoTemplate.js"
export default class Lightbox {
    constructor(photographer, media) {
        this._media = media
        this._photographerId = photographer.id
        this._image = media.image
        this.$content = document.querySelector(".main-content")
        this.$lightbox_media = document.getElementById("lightbox_media")
        this.$lightbox = document.querySelectorAll(".lightbox, .background")
        this.$close_icon = document.querySelector(".lightbox_close-btn")
        this.index = 0
        this.mediaSrc = this._media.map(element => element.getSrc())
        this.init()
    }

    displayLightbox(index) {
        this.index = index
        this.$lightbox.forEach(element => {
            element.classList.add("visible", "showing")
        })
        this.$content.setAttribute("inert", "")
        document.querySelector(".lightbox").focus()
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

    showPreviousMedia() {
        this.index = (this.index - 1 + this.mediaSrc.length) % this.mediaSrc.length
        this.updateLightBox()
    }

    showNextMedia() {
        this.index = (this.index + 1) % this.mediaSrc.length
        this.updateLightBox()
    }


    updateLightBox() {
        const $lightbox_file = document.querySelector(".lightbox_file")
        $lightbox_file.src = `./assets/media/${this._photographerId}/${this.mediaSrc[this.index]}`
    }
    

    init() {
        // open lightbox
        this._media.forEach((media, index) => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".media_element").addEventListener("click", () => {
                media.createLightbox(this.mediaSrc[index])
                this.displayLightbox(index)
            })
            // keypress to open lightbox
            $media.querySelector(".media_element").addEventListener("keydown", (e) => {
                if ((e.key === "Enter" || e.key === " ")) {
                    e.preventDefault()
                    media.createLightbox(this.mediaSrc[index])
                    this.displayLightbox(index)
                }
            })
        })

        // change media
        document.querySelector(".left").addEventListener("click", () => { this.showPreviousMedia() })
        document.querySelector(".right").addEventListener("click", () => { this.showNextMedia() })

        // keypress to change media
        document.querySelector(".lightbox").addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.showPreviousMedia()
            } else if (e.key === "ArrowRight") {
                this.showNextMedia()
            }
        })
        document.querySelector(".left").addEventListener("keydown", (e) => {
            if ((e.key === "Enter" || e.key === " ")
            ) {
                e.preventDefault()
                this.showPreviousMedia()
            }
        })
        document.querySelector(".right").addEventListener("keydown", (e) => {
            if ((e.key === "Enter" || e.key === " ")
            ) {
                e.preventDefault()
                this.showNextMedia()
            }
        })

        // close lightbox
        document.addEventListener("click", (e) => {
            if (e.target.matches(".lightbox .lightbox_close-btn") || e.target.matches("body")) { this.closeLightbox() }
        })

        // keypress to close lightbox
        document.addEventListener("keydown", (e) => {
            if (
                e.key === "Escape" ||
                ((e.key === "Enter" || e.key === " ") && document.activeElement === this.$close_icon)
            ) {
                e.preventDefault()
                this.closeLightbox()
            }
        })
    }
}