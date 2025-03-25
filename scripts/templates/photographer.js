function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data
    const picture = `assets/photographers/${portrait}`
    const location = `Localisation : ${city}, ${country}`
    const slogan = `Slogan : ${tagline}`
    const cost = `Tarif : ${price}€ par jour`

    function getUserCardDOM() {
        const img = document.createElement("img")
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

        const h2 = document.createElement("h2")
        h2.textContent = name

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

        const article = document.createElement("article")
        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(spanLocation)
        article.appendChild(spanTagline)
        article.appendChild(spanPrice)
        return (article)
    }

    return { name, picture, getUserCardDOM }
}