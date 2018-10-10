import { log } from "./helpers/logger";

export const go = async () => {
    var counter;
    var displayMessage = "";

    for (counter = 1 ; counter <= 100; counter++) {
        if (counter % 3 && counter % 5) {
            displayMessage += counter;
        } else {
            if (counter % 3 == 0) {
                displayMessage += "Boss";
            }
            if (counter % 5 == 0) {
                displayMessage += "Hog";
            }
        }
        displayMessage += "\n";
    }

    await log(displayMessage);
};

go();
