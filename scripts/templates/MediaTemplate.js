import Media from "../models/Media.js"

export default class MediaTemplate extends Media {
    constructor(media) {
        super(media)
        this._media = media
    }

    // add or remove a like
    updateLikes() {
        const $media = document.getElementById(`${this._media.id}`)
        const $likeIcon = $media.querySelector(".like-icon")
        this._media.likes += this._media.liked ? -1 : 1
        // one like maximum
        this._media.liked = !this._media.liked
        //change heart icon state
        $likeIcon.classList.toggle("fa-solid", this._media.liked)
        $likeIcon.classList.toggle("fa-regular", !this._media.liked)
        $media.querySelector(".media-likes").textContent = this._media.likes
    }

    addMediaInfos($article) {
        const $mediaInfos = document.createElement("div")
        $mediaInfos.classList.add("media-infos")
        $mediaInfos.innerHTML = `
            <span class="media-title">${this._title}</span>
            <div class="likes-section" tabindex="0">
                <span class="media-likes">${this._likes}</span>
                <i class="fa-heart like-icon" aria-label="likes"></i>
            </div>
        `
        $article.appendChild($mediaInfos)
    }
}