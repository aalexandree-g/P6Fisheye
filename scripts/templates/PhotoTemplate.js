import Media from "../models/Media.js"

export default class PhotoTemplate extends Media {
    constructor(media) {
        super(media)
        this._image = media.image
    }

    createMedia() {
        const $photoElement = document.createElement("article")
        $photoElement.classList.add("media_element")
        const photoElement = `
            <a href="" aria-label="${this._title}, closeup view">
                <img src="./assets/media/${this._photographerId}/${this._image}" alt="">
            </a>
            <div class="media_infos">
                <span class="media_title">${this._title}</span>
                <div class="likes_section">
                    ${this._likes}
                    <i class="fa-solid fa-heart" aria-label="likes"></i>
                </div>
            </div>
            `
        $photoElement.innerHTML = photoElement
        return $photoElement
    }
}