
/**
 * Capitalizes the first letter of each word in a sentence
 * 
 * @param {*} sentence Input string
 */
function capFirstLetter(sentence){
    
    const words = sentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        if(words[i].length > 0){
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
    }

    return words.join(" ");
}


module.exports.capFirstLetter = capFirstLetter;