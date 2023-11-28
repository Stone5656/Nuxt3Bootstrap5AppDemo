onmessage =  function(e) {
    if (e.data.action === 'generateSudoku') {
        const gridSize = e.data.gridSize;
        // 数独生成のロジック
        // 例: generateSudoku(gridSize) を呼び出す
        const grid = generateSudoku(gridSize); // 仮の関数呼び出し

        postMessage(grid);
    }
};