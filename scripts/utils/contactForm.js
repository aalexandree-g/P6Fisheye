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
                document.querySelector(".modal h2").innerHTML = ""
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

        document.querySelector(".submit_button").addEventListener("click", (e) => {
            e.preventDefault()
            const firstnameInput = document.getElementById("firstname").value
            const lastnameInput = document.getElementById("lastname").value
            const emailInput = document.getElementById("email").value
            const messageInput = document.getElementById("message").value

            console.log(`Les données invalides ne sont pas vérifiées.\nPrénom : ${firstnameInput}\nNom : ${lastnameInput}\nEmail : ${emailInput}\nMessage : ${messageInput}`)
        })
    }
}