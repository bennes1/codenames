import '../css/color.css';

const returnColorBackground = (colorCode) => {
	switch(colorCode) {
		case "R":
			return "redBackground";
		case "B":
			return "blueBackground";
		case "W":
			return "neutralBackground";
		case "A":
			return "assassinBackground";
		case "T":
		default:
			return "";
	}
};

const returnColorBorder = (colorCode) => {
	switch(colorCode) {
		case "R":
			return "redBorder";
		case "B":
			return "blueBorder";
		case "W":
			return "neutralBorder";
		case "A":
			return "assassinBorder";
		case "T":
		default:
			return "";
	}
}

export { returnColorBorder, returnColorBackground };
