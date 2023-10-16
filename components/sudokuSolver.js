export function isValidMove(grid, row, col, num) {
    const actualGrid = grid.value ? grid.value : grid;  // Proxyオブジェクトを考慮

    if (num === '' || num < 0 || num > 99) {
        return false;
    }

    const rows = actualGrid.length;
    const cols = actualGrid[0].cells.length;

    // 同じ行に同じ数字があるかチェック
    for (let x = 0; x < cols; x++) {
        if (actualGrid[row].cells[x].value == num && x !== col) { // 同じ列を除外
            return false;
        }
    }

    // 同じ列に同じ数字があるかチェック
    for (let y = 0; y < rows; y++) {
        if (actualGrid[y].cells[col].value == num && y !== row) { // 同じ行を除外
            return false;
        }
    }

    const startRow = Math.floor(row / 10) * 10;
    const startCol = Math.floor(col / 10) * 10;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (actualGrid[i + startRow].cells[j + startCol].value == num &&
                (i + startRow !== row || j + startCol !== col)) { // 同じセルを除外
                return false;
            }
        }
    }

    return true;
}

export function isComplete(grid) {
    const actualGrid = grid.value ? grid.value : grid;  // Proxyオブジェクトを考慮

    const rows = actualGrid.length;
    const cols = actualGrid[0].cells.length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (actualGrid[row].cells[col].value === '') {
                return false;
            }
        }
    }
    return true;
}
