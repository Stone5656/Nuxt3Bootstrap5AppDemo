import { apiGenerateSudoku,apiCreateSudokuGrid } from '../api/sudokuapi';
import { apiIsValidMove, apiIsComplete, apiIsPuzzleValid } from '../api/sudokuapi'

export const useSudokuLogic = () => {
  const gridSizes = ref(inject('gridSizes') || 9);
  const rows = ref([]);
  const currentDifficulty = ref(gridSizes); // 例として 'easy' をデフォルト値とする
  const puzzleCompleted = ref(false);
  const initializeGrid = async () => {
    const initialGrid = await apiCreateSudokuGrid(gridSizes.value);
    rows.value = initialGrid;
  };

  onMounted(async () => {
    await initializeGrid();
  });

  watch(rows, async () => {
    if (await apiIsComplete(rows.value) && await apiIsPuzzleValid(rows.value)) {
      alert("Congratulations! You have completed the puzzle.");
      puzzleCompleted.value = true
    }
  }, { deep: true });

  const { maxlength } = useMaxLength(gridSizes);

  const validateMove = async (rowIndex, colIndex, value) => {
    if (maxlength.value >= 2 && value.length === 1) {
      return;
    }
    if (value.length >= 2) {
      const isValid = await apiIsValidMove(rows.value, rowIndex, colIndex, value);
      if (!isValid) {
        alert("Invalid move!");
      }
    }
  };

  const fillNumbers = async () => {
    const newGrid = await apiGenerateSudoku(currentDifficulty.value);
    rows.value = newGrid;
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