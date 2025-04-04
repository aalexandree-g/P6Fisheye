export default class PhotographerTemplate {
    constructor(photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const $card = document.createElement("article")
        const photographerCard = `
            <a href="photographer.html?id=${this._photographer.id}" aria-label="${this._photographer.name}">
                <img src="./assets/photographers/${this._photographer.portrait}" alt="">
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
        `
        $card.innerHTML = photographerCard
        return $card
    }

    createPhotographerProfile() {
        const $profile = document.createElement("div")
        $profile.classList.add("photographer_header")
        const photographerProfile = `
            <div class="text_content">
                <h1>${this._photographer.name}</h1>
                <span class="location" aria-label="Localisation : ${this._photographer.location}">
                    ${this._photographer.location}
                </span>
                <span class="slogan" aria-label="Slogan : ${this._photographer.tagline}">
                    ${this._photographer.tagline}
                </span>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src="./assets/photographers/${this._photographer.portrait}" alt="${this._photographer.name}">
        `
        $profile.innerHTML = photographerProfile
        return $profile
    }
}