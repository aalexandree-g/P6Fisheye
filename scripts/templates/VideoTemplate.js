import MediaTemplate from "./MediaTemplate.js"

export default class VideoTemplate extends MediaTemplate {
    constructor(media) {
        super(media)
        this._video = media.video
    }

    getSrc() {
        return this._video
    }

    // display video in gallery
    createMedia() {
        // prepare thumbnail
        const videoName = this._video
        const thumbnailName = videoName.replace(/\.mp4$/, ".jpg")
        // display thumbnail
        const $videoElement = document.createElement("article")
        $videoElement.classList.add("media-card")
        $videoElement.id = this._id
        const videoElement = `
            <div class="media-container" tabindex="0">
                <img class="media-element" src="./assets/media/thumbnails/${thumbnailName}" alt="${this._title}, agrandir la vidéo">
            </div>
        `.trim()
        $videoElement.innerHTML = videoElement
        this.addMediaInfos($videoElement)
        return $videoElement
    }

    // display video in lightbox
    createLightbox(mediaSrc) {
        const $lightboxMedia = document.getElementById("lightbox-media")
        $lightboxMedia.innerHTML = `
            <video id="lightbox-video" controls autoplay>
                <source class="lightbox-file" src="./assets/media/${this._photographerId}/${mediaSrc}" type="video/mp4">
                Votre navigateur ne supporte pas la vidéo.
            </video>
            <span class="lightbox-title">${this._title}</span>
        `.trim()
        return $lightboxMedia
    }
}