export default class EncartTemplate {
    constructor(photographer) {
        this._photographer = photographer
    }

    createPanel(totalLikes) {
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