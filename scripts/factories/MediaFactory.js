import Photo from "../models/Photo.js"
import Video from "../models/Video.js"

export default class MediaFactory {
    constructor(media) {
        if (media.image) {
            return new Photo(media)
        } else if (media.video) {
            return new Video(media)
        } else {
            throw "Unknow format type"
        }
    }
}