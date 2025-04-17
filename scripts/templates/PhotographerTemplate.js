export default class PhotographerTemplate {
    constructor(photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const $card = document.createElement("article")
        $card.classList.add("photographer-card")
        $card.id = this._photographer.id
        $card.innerHTML = `
            <a href="photographer.html?id=${this._photographer.id}" aria-label="${this._photographer.name}">
                <div class="profile-picture">
                    <img class="photographer-picture" src="./assets/photographers/${this._photographer.portrait}" alt="">
                </div>
                <h2>${this._photographer.name}</h2>
            </a>
            <span class="location" aria-label="Localisation : ${this._photographer.location}">
                ${this._photographer.location}
            </span>
            <span class="slogan" aria-label="Slogan : ${this._photographer.tagline}">
                ${this._photographer.tagline}
            </span>
            <span class="cost" aria-label="Tarif : ${this._photographer.price}€ par jour">
                ${this._photographer.price}€/jour
            </span>
        `.trim()
        return $card
    }

    createPhotographerHeader() {
        const $header = document.getElementById("photographer-header")
        $header.innerHTML = `
            <div class="text-content">
                <h1>${this._photographer.name}</h1>
                <span class="location" aria-label="Localisation : ${this._photographer.location}">
                    ${this._photographer.location}
                </span>
                <span class="slogan" aria-label="Slogan : ${this._photographer.tagline}">
                    ${this._photographer.tagline}
                </span>
            </div>
            <button class="contact-button" aria-label="Contactez ${this._photographer.name}">Contactez-moi</button>
            <img src="./assets/photographers/${this._photographer.portrait}" alt="${this._photographer.name}">
        `.trim()
        return $header
    }
}