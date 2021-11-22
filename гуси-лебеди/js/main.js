//import { menu } from "./menu.js";
import { createManyCards } from "./menu.js";
import { cards } from "./gusi-lebedi.js";
import { authoriz } from "./avtorization.js";
import { cases } from "./cases.js";


//menu();
authoriz();
createManyCards(cards);
cases();