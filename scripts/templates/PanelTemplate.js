export default class PanelTemplate {
    constructor(photographer, media) {
        this._photographer = photographer
        this._media = media
        //this.init()
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
        const $likeIcon = $media.querySelector(".like-icon")
        if (!media.liked) {
            media.likes += 1
            media.liked = true
            $likeIcon.classList.remove("fa-regular")
            $likeIcon.classList.add("fa-solid")
        } else {
            media.likes -= 1
            media.liked = false
            $likeIcon.classList.remove("fa-solid")
            $likeIcon.classList.add("fa-regular")
        }
        $media.querySelector(".media-likes").textContent = media.likes
        document.querySelector(".total-likes").textContent = this.getTotalLikes()
    }

    displayPanel() {
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

    setupClickEvents() {
        this._media.forEach(media => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".likes-section").addEventListener("click", () => {
                this.updateLikes(media)
            })
        })
    }

    setupKeydownEvents() {
        this._media.forEach(media => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".likes-section").addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    this.updateLikes(media)
                }
            })
        })
    }

    setupEventListeners() {
        this.setupClickEvents()
        this.setupKeydownEvents()
    }

    init() {
        this.setupEventListeners()
        this.displayPanel()
    }
}