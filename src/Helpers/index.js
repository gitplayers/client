function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

const decideErrorMessage = (error) => {
    switch(error){
        case 404:
            return "It looks like we couldn't find that wedding name... The link may have expired, or maybe there is a typo in the link name."
        case 500:
            return "It looks like there's been an error with the server... Wait a while and refresh to try again."
        default:
            return "There's been an error..."
    }
}

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
  
const images = importAll(require.context('../Assets', false, /\.(png|jpe?g|svg|gif)$/));
const largeSpriteImages = importAll(require.context('../Components/Game/large sprites', false, /\.(png|jpe?g|svg)$/));
const spriteImages = importAll(require.context('../GameComponents/Character/sprites', false, /\.(png|jpe?g|svg)$/));
const obstacleSprites = importAll(require.context('../GameComponents/ObstacleSprites', false, /\.(png|jpe?g|svg)$/));

export { shuffle, decideErrorMessage, images, largeSpriteImages, spriteImages, obstacleSprites }