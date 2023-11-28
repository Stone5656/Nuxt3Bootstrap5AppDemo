const { isValidMove, isComplete, isPuzzleValid } = useSudokuSolver();
const { generateSudoku,createSudokuGrid } = useSudokuGenerator()
export const useSudokuLogic = () => {
  const gridSizes = ref(inject('gridSizes') || 9);
  const rows = ref(createSudokuGrid(gridSizes)); // ref を使用して初期化
  const currentDifficulty = ref(gridSizes); // 例として 'easy' をデフォルト値とする
  const puzzleCompleted = ref(false);

  watch(rows, () => {
    if (isComplete(rows.value) && isPuzzleValid(rows.value)) {
      alert("Congratulations! You have completed the puzzle.");
      puzzleCompleted.value = true
    }
  }, { deep: true });

  const { maxlength } = useMaxLength(gridSizes);

  const validateMove = (rowIndex, colIndex, value) => {
    if (maxlength.value >= 2 && value.length === 1) {
      return;
    }
    if (value.length >= 2 && !isValidMove(rows.value, rowIndex, colIndex, value)) {
      alert("Invalid move!");
    }
  };

  const fillNumbers = async () => {
    const newGrid = await generateSudoku(currentDifficulty.value);
    rows.value = newGrid; // 新しいグリッドを割り当てる
  };

  const setDifficulty = (level) => {
    console.log('Setting difficulty to:', level);
    currentDifficulty.value = level; // 難易度を更新
    if (level === 'easy') {
      gridSizes.value = 9;
    } else if (level === 'medium') {
      gridSizes.value = 16;
    } else if (level === 'hard') {
      gridSizes.value = 25;
    }
    fillNumbers(); // 新しいグリッドを生成
  };
  return { rows, gridSizes, validateMove, setDifficulty, puzzleCompleted };
};