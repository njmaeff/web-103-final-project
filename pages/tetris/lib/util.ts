/**
 * see
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 * @param min - minimum random number (inclusive)
 * @param max - maximum random number (inclusive)
 */
export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * We add an amount of rows to the top of the grid matrix and initialize the
 * value with a function passed in by the user
 * @param matrix
 * @param amount
 * @param init
 */
export function padGridRowsTop<T>(
    matrix: T[][],
    amount,
    init: () => any
): T[][] {
    // get length of a row
    if (amount > 0) {
        const length = matrix[0].length;

        for (let i = 0; i < amount; i++) {
            const row = [];

            for (let j = 0; j < length; j++) {
                row[j] = init();
            }
            matrix.push(row);
        }
    }
    return matrix;
}
