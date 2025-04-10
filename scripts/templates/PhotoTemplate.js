import Media from "../models/Media.js"

export default class PhotoTemplate extends Media {
    constructor(media) {
        super(media)
        this._image = media.image
    }

    createMedia() {
        const $photoElement = document.createElement("article")
        $photoElement.classList.add("media_card")
        $photoElement.id = this._id
        const photoElement = `
            <img class="media_element" src="./assets/media/${this._photographerId}/${this._image}" alt="${this._title}, agrandir la photo">
            <div class="media_infos">
                <span class="media_title">${this._title}</span>
                <div class="likes_section">
                    <span class="media_likes">${this._likes}</span>
                    <i class="fa-solid fa-heart" aria-label="likes"></i>
                </div>
            </div>
            `
        $photoElement.innerHTML = photoElement
        return $photoElement
    }
}