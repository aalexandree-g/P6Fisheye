import Media from "../models/Media.js"

export default class MediaTemplate extends Media {
    constructor(media) {
        super(media)
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