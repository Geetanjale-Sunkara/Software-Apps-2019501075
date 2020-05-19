function charCount(word, char) {
    var cnt = 0;
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) === char) {
            cnt += 1;
        }
    }
    return cnt;
}

function countBs(word) {
    return "b: " + charCount(word, 'b') + " " + "B: " + charCount(word, 'B');
}

const word = 'abcABCabbAB';
console.log(countBs(word));