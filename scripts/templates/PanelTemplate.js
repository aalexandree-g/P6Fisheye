export default class PanelTemplate {
    constructor(photographer, media) {
        this._photographer = photographer
        this._media = media
        this.init()
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
        const $like_icon = $media.querySelector(".like-icon")
        if (!media.liked) {
            media.likes += 1
            media.liked = true
            $like_icon.classList.remove("fa-regular")
            $like_icon.classList.add("fa-solid")
        } else {
            media.likes -= 1
            media.liked = false
            $like_icon.classList.remove("fa-solid")
            $like_icon.classList.add("fa-regular")
        }
        $media.querySelector(".media-likes").textContent = media.likes
        document.querySelector(".total-likes").textContent = this.getTotalLikes()
    }

    init() {
        this._media.forEach(media => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".likes-section").addEventListener("click", () => {
                this.updateLikes(media)
            })
            $media.querySelector(".likes-section").addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    this.updateLikes(media)
                }
            })
        })
        const $panel = document.getElementById("panel")
        const totalLikes = this.getTotalLikes()
        $panel.innerHTML = `
            <div class="likes">
                <span class="total-likes">${totalLikes}</span>
                <i class="fa-solid fa-heart" aria-label="likes"></i>
            </div>
            <div class="price">
                ${this._photographer.price}€/jour
            </div>
        `.trim()
        return $panel
    }
}