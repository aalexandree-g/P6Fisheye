export default class ContactModal {
    constructor(photographer) {
        this._photographer = photographer
        this.$content = document.querySelector(".main-content")
        this.$modalTitle = document.getElementById("modal-title")
        this.$modal = document.querySelectorAll(".modal, .background")
        this.$contactButton = document.querySelector(".contact-button")
        this.$closeIcon = document.querySelector(".modal-close-btn")
        this.$submitButton = document.getElementById("submit-button")
    }

    displayModal() {
        this.$modalTitle.innerHTML = `Contactez<br>${this._photographer.name}`
        this.$modal.forEach(element => {
            element.classList.add("visible", "showing")
        })
        this.$content.setAttribute("inert", "")
    }

    closeModal() {
        this.$modal.forEach(element => {
            element.classList.replace("showing", "hiding")
            setTimeout(() => {
                this.$modalTitle.textContent = ""
                element.classList.remove("visible", "hiding")
            }, 250)
        })
        this.$content.removeAttribute("inert")
        document.querySelector(".contact-button").focus()
    }

    // all click events
    setupClickEvents() {
        // open modal
        this.$contactButton.addEventListener("click", () => {
            this.displayModal()
        })
        // close modal
        document.addEventListener("click", (e) => {
            if (e.target.matches(".modal-close-btn") || e.target.matches("body")) { this.closeModal() }
        })
        // submit form
        this.$submitButton.addEventListener("click", (e) => {
            e.preventDefault()
            const firstnameInput = document.getElementById("firstname").value
            const lastnameInput = document.getElementById("lastname").value
            const emailInput = document.getElementById("email").value
            const messageInput = document.getElementById("message").value
            console.log(`Les données invalides ne sont pas vérifiées.\nPrénom : ${firstnameInput}\nNom : ${lastnameInput}\nEmail : ${emailInput}\nMessage : ${messageInput}`)
            document.querySelector(".modal-close-btn").focus()
        })
    }

    // all keyboard events
    setupKeydownEvents() {
        // close modal
        document.addEventListener("keydown", (e) => {
            if (
                e.key === "Escape" ||
                ((e.key === "Enter" || e.key === " ") && document.activeElement === this.$closeIcon)
            ) {
                e.preventDefault()
                this.closeModal()
                }
        })
        // trap focus inside the modal
        this.$submitButton.addEventListener("keydown", (e) => {
            if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault()
                this.$closeIcon.focus()
            }
        })
        this.$closeIcon.addEventListener("keydown", (e) => {
            if (e.key === "Tab" && e.shiftKey) {
                e.preventDefault()
                this.$submitButton.focus()
            }
        })
    }

    init() {
        this.setupClickEvents()
        this.setupKeydownEvents()
    }
}