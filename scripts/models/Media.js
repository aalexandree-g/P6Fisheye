export default class Media {
    constructor(media) {
        this._id = media.id
        this._photographerId = media.photographerId
        this._title = media.title
        this._likes = media.likes
        this._date = media.date
        this._price = media.price
        this._liked = false
    }

    get id() { return this._id }

    get photographerId() { return this._photographerId }

    get title() { return this._title }

    get likes() { return this._likes }

    set likes(newLikes) { this._likes = newLikes}

    get date() { return this._date.replaceAll("-", "") }

    get price() { return this._price }
}