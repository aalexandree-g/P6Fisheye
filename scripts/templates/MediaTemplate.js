import Media from "../models/Media.js"
import { changeClass } from "../utils/helper.js"

export default class MediaTemplate extends Media {
    constructor(media) {
        super(media)
        this._media = media
    }

    updateLikes() {
        const $media = document.getElementById(`${this._media.id}`)
        const $likeIcon = $media.querySelector(".like-icon")
        if (!this._media.liked) {
            this._media.likes += 1
            this._media.liked = true
            changeClass($likeIcon, "fa-solid", "fa-regular")
        } else {
            this._media.likes -= 1
            this._media.liked = false
            changeClass($likeIcon, "fa-regular", "fa-solid")
        }
        $media.querySelector(".media-likes").textContent = this._media.likes
    }

    addMediaInfos($article) {
        const $mediaInfos = document.createElement("div")
        $mediaInfos.classList.add("media-infos")
        $mediaInfos.innerHTML = `
            <span class="media-title">${this._title}</span>
            <div class="likes-section" tabindex="0">
                <span class="media-likes">${this._likes}</span>
                <i class="fa-regular fa-heart like-icon" aria-label="likes"></i>
            </div>
        `
        $article.appendChild($mediaInfos)
    }
}