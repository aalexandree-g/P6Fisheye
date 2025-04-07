export default class PanelTemplate {
    constructor(photographer, media) {
        this._photographer = photographer
        this._media = media
    }

    getTotalLikes() {
        let totalLikes = 0
        for (let i = 0; i < this._media.length; i++) {
            totalLikes += this._media[i].likes
        }
        return totalLikes
    }

    createPanel() {
        const totalLikes = this.getTotalLikes()
        const $panel = document.querySelector(".panel")
        const panel = `
            <div class="likes">
                ${totalLikes}
                <i class="fa-solid fa-heart" aria-label="likes"></i>
            </div>
            <div class="price">
                ${this._photographer.price}€/jour
            </div>
        `
        $panel.innerHTML = panel
        return $panel
    }
}