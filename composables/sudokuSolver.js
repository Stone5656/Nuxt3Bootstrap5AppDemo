const memoize = (fn) => {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
};
export const useSudokuSolver = () => {
    const isValidMove = memoize((grid, row, col, num) => {
        const actualGrid = grid.value ? grid.value : grid;  // Proxyオブジェクトを考慮

        if (num === '' || num < 1 || num > actualGrid.length) { // numの最大値を動的に変更
            return false;
        }

        const rows = actualGrid.length;
        const cols = actualGrid[0].cells.length;
        const number = parseInt(num, 10);
        if (isNaN(number) || number < 1 || number > actualGrid.length) {
            return false;
        }

        // 同じ行に同じ数字があるかチェック
        for (let x = 0; x < cols; x++) {
            if (actualGrid[row].cells[x].value == num && x !== col) {
                return false;
            }
        }

        // 同じ列に同じ数字があるかチェック
        for (let y = 0; y < rows; y++) {
            if (actualGrid[y].cells[col].value == num && y !== row) {
                return false;
            }
        }

        const sqrt = Math.sqrt(rows); // グリッドサイズに基づいてサブグリッドのサイズを決定
        const startRow = Math.floor(row / sqrt) * sqrt;
        const startCol = Math.floor(col / sqrt) * sqrt;

        for (let i = 0; i < sqrt; i++) {
            for (let j = 0; j < sqrt; j++) {
                if (actualGrid[i + startRow].cells[j + startCol].value == num &&
                    (i + startRow !== row || j + startCol !== col)) {
                    return false;
                }
            }
        }

        return true;
    });

    const isComplete = memoize((grid) => {
        const actualGrid = grid.value ? grid.value : grid;

        const rows = actualGrid.length;
        const cols = actualGrid[0]?.cells.length;

        if (!cols) {
            return false;
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (actualGrid[row].cells[col]?.value === '') {
                    return false; // 空のセルがあれば false を返す
                }
            }
        }
        return true; // すべてのセルが埋まっていれば true を返す
    });

    const isPuzzleValid = memoize((grid) => {
        const actualGrid = grid.value ? grid.value : grid;
        const rows = actualGrid.length;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < rows; col++) {
                const cellValue = actualGrid[row].cells[col].value;
                if (cellValue !== '' && !isValidMove(actualGrid, row, col, cellValue)) {
                    return false;
                }
            }
        }
        return true;
    });
    return { isValidMove, isComplete, isPuzzleValid };
};