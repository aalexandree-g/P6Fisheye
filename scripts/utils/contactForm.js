export default class ContactForm {
    constructor(photographer) {
        this._photographer = photographer
        this.$content = document.querySelector(".main-content")
        this.$background = document.querySelector(".background")
        this.$modal = document.querySelector(".modal")
        this.$modal_title = document.getElementById("modal_title")
        this.$modalAndBackground = document.querySelectorAll(".modal, .background")
        this.$contact_button = document.querySelector(".contact_button")
        this.$close_icon = document.querySelector(".modal img")
        this.$submit_button = document.getElementById("submit_button")
    }

    displayModal() {
        this.$modal_title.innerHTML += `Contactez<br>${this._photographer.name}`
    
        this.$modalAndBackground.forEach(element => {
            element.classList.add("visible", "showing")
        })
        this.$content.setAttribute("inert", "")
    }

    closeModal() {
        this.$modalAndBackground.forEach(element => {
            element.classList.remove("showing")
            element.classList.add("hiding")
            setTimeout(() => {
                this.$modal_title.textContent = ""
                element.classList.remove("visible", "hiding")
            }, 250)
        })
        this.$content.removeAttribute("inert")
    }

    init() {
        // open modal
        this.$contact_button.addEventListener("click", () => { this.displayModal() })

        // close modal
        document.addEventListener("click", (e) => {
            if (e.target.matches(".modal img") || e.target.matches("body")) { this.closeModal() }
        })

        // keypress to close modal
        document.addEventListener("keydown", (e) => {
            if (
                e.key === "Escape" ||
                ((e.key === "Enter" || e.key === " ") && document.activeElement === this.$close_icon)
            ) {
                e.preventDefault()
                this.closeModal()
                }
        })

        // submit form
        this.$submit_button.addEventListener("click", (e) => {
            e.preventDefault()
            const firstnameInput = document.getElementById("firstname").value
            const lastnameInput = document.getElementById("lastname").value
            const emailInput = document.getElementById("email").value
            const messageInput = document.getElementById("message").value
            console.log(`Les données invalides ne sont pas vérifiées.\nPrénom : ${firstnameInput}\nNom : ${lastnameInput}\nEmail : ${emailInput}\nMessage : ${messageInput}`)
        })
    }
}