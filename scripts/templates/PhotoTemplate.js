import MediaTemplate from "./MediaTemplate.js"

export default class PhotoTemplate extends MediaTemplate {
    constructor(media) {
        super(media)
        this._image = media.image
    }

    getSrc() {
        return this._image
    }

    createMedia() {
        const $photoElement = document.createElement("article")
        $photoElement.classList.add("media-card")
        $photoElement.id = this._id
        $photoElement.innerHTML = `
            <div class="media-container" tabindex="0">
                <img class="media-element" src="./assets/media/${this._photographerId}/${this._image}" alt="${this._title}, agrandir la photo">
            </div>
        `.trim()
        this.addMediaInfos($photoElement)
        return $photoElement
    }

    createLightbox(mediaSrc) {
        const $lightboxMedia = document.getElementById("lightbox-media")
        $lightboxMedia.innerHTML = `
            <img class="lightbox-file" src="./assets/media/${this._photographerId}/${mediaSrc}" alt="${this._title}">
            <span class="lightbox-title">${this._title}</span>
        `.trim()
        return $lightboxMedia
    }
}