export default class ContactForm {
    constructor(photographer) {
        this._photographer = photographer
    }

    displayModal() {
        document.querySelector(".modal h2").innerHTML += `Contactez<br>${this._photographer.name}`
        document.querySelectorAll(".modal, .background").forEach(element => {
            element.classList.add("visible", "showing")
        })
    }

    closeModal() {
        document.querySelectorAll(".modal, .background").forEach(element => {
            element.classList.remove("showing")
            element.classList.add("hiding")
            setTimeout(() => {
                document.querySelector(".modal h2").textContent = ""
                element.classList.remove("visible", "hiding")
            }, 250)
        })
    }

    init() {
        document.querySelector(".contact_button").addEventListener("click", () => {
            this.displayModal()
        })

        document.querySelectorAll(".modal img, .background").forEach(element => {
            element.addEventListener("click", () => {
                this.closeModal()
            })
        })
    }
}