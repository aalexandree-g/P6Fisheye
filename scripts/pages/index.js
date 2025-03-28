import { getPhotographers } from "../utils/api.js"
import { displayUserCards } from "../functions/index.js"

// get photographers' data from JSON file
const photographers = await getPhotographers()

// display all photographers' cards
displayUserCards(photographers)