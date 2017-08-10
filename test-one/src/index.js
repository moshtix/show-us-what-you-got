import Logger from './helpers/logger';

let logger = new Logger();

//Your code should go here instead of the welcome message below. Create and modify additional files as necessary.
//Begin Dominic's Code
let stringBuffer = "";

//Simple function, ideally should have it's own module
let isMultipleOf = function(multiple, number) {
	let h = (number/multiple);
	return h === Math.round(h);
}

//Iterate
for(let i = 1; i <= 100; i++) {
	let isMultipleOfThree = isMultipleOf(3, i);
	let isMultipleOfFive = isMultipleOf(5, i);
	if(isMultipleOfThree && isMultipleOfFive) {
		stringBuffer += "BossHog";
	} else if(isMultipleOfThree) {
		stringBuffer += "Boss";
	} else if(isMultipleOfFive) {
		stringBuffer += "Hog";
	} else {
		stringBuffer += i.toString();
	}
	stringBuffer += "\n";
}
logger.log(stringBuffer);
//End Dominic's Code

const welcomeMessage = "Congrats, you're up and running! Welcome to the first moshtix code challenge! " +
    "Please replace this message with your solution and feel free to add " +
    "or modify other files as necessary. Good luck : )";

logger.log(welcomeMessage);