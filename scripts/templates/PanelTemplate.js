export default class PanelTemplate {
    constructor(photographer, media) {
        this._photographer = photographer
        this._media = media
    }

    getTotalLikes() {
        let totalLikes = 0
        this._media.forEach(m => {
            totalLikes += m.likes
        })
        return totalLikes
    }

    updateLikes(media) {
        const $media = document.getElementById(`${media.id}`)
        media.likes += 1
        $media.querySelector(".media_likes").textContent = media.likes
        document.querySelector(".total_likes").textContent = this.getTotalLikes()
    }

    createPanel() {
        this._media.forEach(media => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".likes_section").addEventListener("click", () => {
                this.updateLikes(media)
            }, { once : true })
        })
        const $panel = document.querySelector(".panel")
        const totalLikes = this.getTotalLikes()
        const panel = `
            <div class="likes">
                <span class="total_likes">${totalLikes}</span>
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