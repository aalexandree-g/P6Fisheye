import Media from "../models/Media.js"

export default class MediaTemplate extends Media {
    constructor(media) {
        super(media)
        this.$content = document.querySelector(".main-content")
        this.$lightbox = document.querySelectorAll(".lightbox")
    }

    addMediaInfos($article) {
        const $media_infos = document.createElement("div")
        $media_infos.classList.add("media_infos")
        $media_infos.innerHTML = `
            <span class="media_title">${this._title}</span>
            <div class="likes_section" tabindex="0">
                <span class="media_likes">${this._likes}</span>
                <i class="fa-regular fa-heart like_icon" aria-label="likes"></i>
            </div>
        `
        $article.appendChild($media_infos)
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

    createLightbox() {
        // open lightbox
        document.querySelector(".media_element").addEventListener("click", () => {
            this.displayLightbox()
        })

        // close lightbox
        document.addEventListener("click", (e) => {
            if (e.target.matches(".lightbox .close-btn") || e.target.matches("body")) { this.closeLightbox() }
        })

        // keypress to close modal
        this.$close_btn = document.querySelector(".lightbox .close-btn")
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