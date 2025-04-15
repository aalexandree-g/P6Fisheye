import MediaTemplate from "./MediaTemplate.js"

export default class VideoTemplate extends MediaTemplate {
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
            <img class="media_element" src="./assets/media/thumbnails/${thumbnailName}" alt="${this._title}, agrandir la vidéo">
        `
        $videoElement.innerHTML = videoElement
        this.addMediaInfos($videoElement)
        return $videoElement
    }

    createLightbox() {
        const $lightbox_media = document.getElementById("lightbox_media")
        $lightbox_media.innerHTML = `
            <video controls autoplay>
                <source src="./assets/media/${this._photographerId}/${this._video}" type="video/mp4">
                Votre navigateur ne supporte pas la vidéo.
            </video>
            <span class="lightbox_title">${this._title}</span>
        `.trim()
        return $lightbox_media
    }
}