import Media from "./Media.js"

export default class Video extends Media {
    constructor(media) {
        super(media)
        this._video = media.video
    }

    createMedia() {
        const videoName = this._video
        const thumbnailName = videoName.replace(/\.mp4$/, ".jpg")

        const $videoElement = document.createElement("article")
        $videoElement.classList.add("media_element")
        const videoElement = `
            <a href="" aria-label="${this._title}, closeup view">
                <img src="./assets/media/thumbnails/${thumbnailName}" alt="">
            </a>
            <div class="media_infos">
                <span class="media_title">${this._title}</span>
                <div class="likes_section">
                    ${this._likes}
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
            `
        $videoElement.innerHTML = videoElement
        return $videoElement
    }
}