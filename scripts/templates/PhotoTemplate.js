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

        const photoElement = `<img class="media_element" src="./assets/media/${this._photographerId}/${this._image}" alt="${this._title}, agrandir la photo">`
        $photoElement.innerHTML = photoElement
        this.addMediaInfos($photoElement)

        return $photoElement
    }
}