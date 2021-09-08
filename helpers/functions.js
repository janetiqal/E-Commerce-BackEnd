

//capitalizes the first letter of strings
function capitalLetter(input) {
    const words = input.split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1)
    }
    return words.join(" ")
}
module.exports= capitalLetter