import Media from "../models/Media.js"

export default class MediaTemplate extends Media {
    constructor(media) {
        super(media)
    }

    addMediaInfos($article) {
        const $media_infos = document.createElement("div")
        $media_infos.classList.add("media_infos")
        $media_infos.innerHTML = `
            <span class="media_title">${this._title}</span>
            <div class="likes_section" tabindex="0">
                <span class="media_likes">${this._likes}</span>
                <i class="fa-regular fa-heart like_icon" aria-label="likes"></i>
            </div>
        `
        $article.appendChild($media_infos)
    }
}