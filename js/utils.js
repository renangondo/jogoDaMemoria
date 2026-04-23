
export function embaralhar(array) {
    for (let x = array.length - 1; x > 0; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        [array[x], array[y]] = [array[y], array[x]];
    }

    return array;
}