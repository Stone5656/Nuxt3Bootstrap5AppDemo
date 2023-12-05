export async function apiIsValidMove(grid, row, col, num) {
    const response = await fetch('/api/is_valid_move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grid, row, col, num })
    });
    const data = await response.json();
    return data.valid;
}
export async function apiIsComplete(grid) {
    const response = await fetch('/api/is_complete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grid })
    });
    const data = await response.json();
    return data.complete;
}
export async function apiIsPuzzleValid(grid) {
    const response = await fetch('/api/is_puzzle_valid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grid })
    });
    const data = await response.json();
    return data.valid;
}
export async function apiGenerateSudoku(gridSize, difficulty) {
    const response = await fetch('/api/generate_sudoku', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gridSize, difficulty })
    });
    const data = await response.json();
    return data;
}
export async function apiCreateSudokuGrid(size) {
    const response = await fetch('/api/create_sudoku_grid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ size })
    });
    const grid = await response.json();
    return grid;
  }