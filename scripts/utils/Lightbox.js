import PhotoTemplate from "../templates/PhotoTemplate.js"
export default class Lightbox {
    constructor(photographer, media) {
        this._media = media
        this.$content = document.querySelector(".main-content")
        this.$lightbox = document.querySelectorAll(".lightbox, .background")
        this.$closeIcon = document.querySelector(".lightbox-close-btn")
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
        document.getElementById("lightbox-media").innerHTML = ""
        this._media[this.index].createLightbox(this.mediaSrc[this.index])     
    }

    init() {
        // open lightbox
        this._media.forEach((media, index) => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".media-element").addEventListener("click", () => {
                media.createLightbox(this.mediaSrc[index])
                this.displayLightbox(index)
            })
            // keypress to open lightbox
            $media.querySelector(".media-element").addEventListener("keydown", (e) => {
                if ((
                    e.key === "Enter" ||
                    e.key === " ")
                ) {
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
            if (e.key === "ArrowLeft") { this.showPreviousMedia() }
            else if (e.key === "ArrowRight") { this.showNextMedia() }
        })
        document.querySelector(".left").addEventListener("keydown", (e) => {
            if ((
                e.key === "Enter" ||
                e.key === " ")
            ) {
                e.preventDefault()
                this.showPreviousMedia()
            }
        })
        document.querySelector(".right").addEventListener("keydown", (e) => {
            if ((
                e.key === "Enter" ||
                e.key === " ")
            ) {
                e.preventDefault()
                this.showNextMedia()
            }
        })
        // close lightbox
        document.addEventListener("click", (e) => {
            if (
                e.target.matches(".lightbox .lightbox-close-btn") ||
                e.target.matches("body")
            ) {
                this.closeLightbox()
            }
        })
        // keypress to close lightbox
        document.addEventListener("keydown", (e) => {
            if (
                e.key === "Escape" ||
                ((e.key === "Enter" || e.key === " ") && document.activeElement === this.$closeIcon)
            ) {
                e.preventDefault()
                this.closeLightbox()
            }
        })
    }
}