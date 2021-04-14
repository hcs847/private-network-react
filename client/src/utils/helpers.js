
const pluralFormat = (word, amount) => {
    if (amount !== 1) {
        return `${word}s`
    }
    return word;
}


export default pluralFormat;