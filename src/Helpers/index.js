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

export { shuffle, decideErrorMessage }