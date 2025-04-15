import MediaTemplate from "./MediaTemplate.js"

export default class PhotoTemplate extends MediaTemplate {
    constructor(media) {
        super(media)
        this._image = media.image
    }

    createMedia() {
        const $photoElement = document.createElement("article")
        $photoElement.classList.add("media_card")
        $photoElement.id = this._id
        $photoElement.innerHTML = `
            <img class="media_element" src="./assets/media/${this._photographerId}/${this._image}" alt="${this._title}, agrandir la photo">
        `.trim()
        this.addMediaInfos($photoElement)
        return $photoElement
    }

    createLightbox() {
        const $lightbox_media = document.getElementById("lightbox_media")
        $lightbox_media.innerHTML = `
            <img src="./assets/media/${this._photographerId}/${this._image}" alt="${this._title}">
            <span class="lightbox_title">${this._title}</span>
        `.trim()
        return $lightbox_media
    }
}