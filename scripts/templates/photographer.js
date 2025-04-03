/*export function photographerTemplate(data, format) {
    const { name, id, city, country, tagline, price, portrait } = data
    const picture = `./assets/photographers/${portrait}`
    const location = `Localisation : ${city}, ${country}`
    const slogan = `Slogan : ${tagline}`
    const cost = `Tarif : ${price}€ par jour`

    const img = document.createElement("img")
    img.src = picture

    const spanLocation = document.createElement("span")
    spanLocation.textContent = `${city}, ${country}`
    spanLocation.classList.add("location")
    spanLocation.setAttribute("aria-label", location)

    const spanTagline = document.createElement("span")
    spanTagline.textContent = tagline
    spanTagline.classList.add("slogan")
    spanTagline.setAttribute("aria-label", slogan)

    const spanPrice = document.createElement("span")
    spanPrice.textContent = `${price}€/jour`
    spanPrice.classList.add("cost")
    spanPrice.setAttribute("aria-label", cost)

    function getUserDOM() {
        if (format === "profile") {
            // photographer's profile
            const h1 = document.createElement("h1")
            h1.textContent = name

            img.setAttribute("alt", name)
            
            const textContent = document.createElement("div")
            textContent.classList.add("text_content")
            textContent.append(h1, spanLocation, spanTagline)

            const profile = document.querySelector(".photographer_header")
            profile.insertBefore(textContent, profile.firstChild)
            profile.appendChild(img)
            return profile
        } else {
            // photographer's card
            const h2 = document.createElement("h2")
            h2.textContent = name

            img.setAttribute("alt", "")
    
            const link = document.createElement("a")
            link.setAttribute("href", `photographer.html?id=${id}`)
            link.setAttribute("aria-label", name)
            link.append(img, h2)
    
            const article = document.createElement("article")
            article.append(link, spanLocation, spanTagline, spanPrice)
            return article
        }
    }
    return getUserDOM()
}*/


class PhotographerTemplate {
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