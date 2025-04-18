import MediaTemplate from "./MediaTemplate.js"

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
                new MediaTemplate(media).updateLikes()
                document.querySelector(".total-likes").textContent = this.getTotalLikes()
            })
        })
    }

    setupKeydownEvents() {
        this._media.forEach(media => {
            const $media = document.getElementById(`${media.id}`)
            $media.querySelector(".likes-section").addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    new MediaTemplate(media).updateLikes()
                    document.querySelector(".total-likes").textContent = this.getTotalLikes()
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