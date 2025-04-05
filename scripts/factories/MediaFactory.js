import PhotoTemplate from "../templates/PhotoTemplate.js"
import VideoTemplate from "../templates/VideoTemplate.js"

export default class MediaFactory {
    constructor(media) {
        if (media.image) {
            return new PhotoTemplate(media)
        } else if (media.video) {
            return new VideoTemplate(media)
        } else {
            throw "Unknow format type"
        }
    }
}