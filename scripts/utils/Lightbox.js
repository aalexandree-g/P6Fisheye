export default class Lightbox {
    constructor(media) {
        this._media = media
        this.$content = document.querySelector(".main-content")
        this.$lightbox = document.querySelectorAll(".lightbox, .background")
        this.$leftArrow = document.querySelector(".left")
        this.$rightArrow = document.querySelector(".right")
        this.$closeIcon = document.querySelector(".lightbox-close-btn")
        this.mediaSrc = this._media.map(element => element.getSrc())
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
            element.classList.replace("showing", "hiding")
            setTimeout(() => {
                element.classList.remove("visible", "hiding")
            }, 250)
        })
        this.$content.removeAttribute("inert")
        document.querySelector(".media-container").focus()
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

    // all click events
    setupClickEvents() {

        // open lightbox
        this._media.forEach((media, index) => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".media-element").addEventListener("click", () => {
                media.createLightbox(this.mediaSrc[index])
                this.displayLightbox(index)
            })
            $media.querySelector(".media-title").addEventListener("click", () => {
                media.createLightbox(this.mediaSrc[index])
                this.displayLightbox(index)
            })
        })

        // change media
        this.$leftArrow.addEventListener("click", () => { this.showPreviousMedia() })
        this.$rightArrow.addEventListener("click", () => { this.showNextMedia() })

        // close lightbox
        document.addEventListener("click", (e) => {
            if (
                e.target.matches(".lightbox .lightbox-close-btn") ||
                e.target.matches("body")
            ) {
                this.closeLightbox()
            }
        })

        // trap focus inside the lightbox
        this.$rightArrow.addEventListener("keydown", (e) => {
            if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault()
                this.$closeIcon.focus()
            }
        })
        this.$closeIcon.addEventListener("keydown", (e) => {
            if (e.key === "Tab" && e.shiftKey) {
                e.preventDefault()
                this.$rightArrow.focus()
            }
        })

    }

    setupKeydownEvents() {
        // open lightbox
        this._media.forEach((media, index) => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".media-container").addEventListener("keydown", (e) => {
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

    setupEventListeners() {
        this.setupClickEvents()
        this.setupKeydownEvents()
    }

    init() {
        this.setupEventListeners()    
    }
}