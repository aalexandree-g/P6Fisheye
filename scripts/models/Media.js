class Media {
    constructor(media) {
        this._id = media.id
        this._photographerId = media.photographerId
        this._title = media.title
        this._likes = media.likes
        this._date = media.date
        this._price = media.price
    }

    get id() { return thius._id }

    get photographerId() { return this._photographerId }

    get title() { return this._title }

    get likes() { return this._likes }

    get date() { return this._date }

    get price() { return this._price }
}













class Photo extends Media {
    constructor(media) {
        super(media)
        this._image = media.image
    }
}

class Video extends Media {
    constructor(media) {
        super(media)
        this._video = media.video
    }
}