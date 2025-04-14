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

        const videoElement = `<img src="./assets/media/thumbnails/${thumbnailName}" alt="${this._title}, agrandir la vidéo">`
        $videoElement.innerHTML = videoElement
        this.addMediaInfos($videoElement)
        
        return $videoElement
    }
}