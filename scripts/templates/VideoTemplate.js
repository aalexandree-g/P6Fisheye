import MediaTemplate from "./MediaTemplate.js"

export default class VideoTemplate extends MediaTemplate {
    constructor(media) {
        super(media)
        this._video = media.video
    }

    getSrc() {
        return this._video
    }

    createMedia() {
        const videoName = this._video
        const thumbnailName = videoName.replace(/\.mp4$/, ".jpg")

        const $videoElement = document.createElement("article")
        $videoElement.classList.add("media_card")
        $videoElement.id = this._id
        const videoElement = `
            <img class="media_element" src="./assets/media/thumbnails/${thumbnailName}" alt="${this._title}, agrandir la vidéo" tabindex="0">
        `.trim()
        $videoElement.innerHTML = videoElement
        this.addMediaInfos($videoElement)
        return $videoElement
    }

    createLightbox(mediaSrc) {
        const $lightbox_media = document.getElementById("lightbox_media")
        $lightbox_media.innerHTML = `
            <video id="lightbox_video" controls autoplay>
                <source class="lightbox_file" src="./assets/media/${this._photographerId}/${mediaSrc}" type="video/mp4">
                Votre navigateur ne supporte pas la vidéo.
            </video>
            <span class="lightbox_title">${this._title}</span>
        `.trim()
        return $lightbox_media
    }
}