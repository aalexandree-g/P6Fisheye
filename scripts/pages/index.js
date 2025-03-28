import { getPhotographers } from "../utils/api.js"
import { displayUserCards } from "../functions/index.js"

const photographers = await getPhotographers()
displayUserCards(photographers)