import PhotoTemplate from "../templates/PhotoTemplate.js"
import VideoTemplate from "../templates/VideoTemplate.js"

export default class MediaFactory {
    constructor(media) {
        this._media = media
        if (this._media.image) {
            return new PhotoTemplate(this._media)
        } else if (this._media.video) {
            return new VideoTemplate(this._media)
        } else {
            throw "Unknow format type"
        }
    }
}