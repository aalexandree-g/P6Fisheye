import Media from "../models/Media.js"

export default class VideoTemplate extends Media {
    constructor(media) {
        super(media)
        this._video = media.video
    }

    createMedia() {
        const videoName = this._video
        const thumbnailName = videoName.replace(/\.mp4$/, ".jpg")

        const $videoElement = document.createElement("article")
        $videoElement.classList.add("media_card")
        $videoElement.id = this._id
        const videoElement = `
            <a href="" aria-label="${this._title}, closeup view">
                <img src="./assets/media/thumbnails/${thumbnailName}" alt="">
            </a>
            <div class="media_infos">
                <span class="media_title">${this._title}</span>
                <div class="likes_section">
                    <span class="media_likes">${this._likes}</span>
                    <i class="fa-solid fa-heart" aria-label="likes"></i>
                </div>
            </div>
            `
        $videoElement.innerHTML = videoElement
        return $videoElement
    }
}