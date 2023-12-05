import random
from sudoku_solver import isValidMove
def create_sudoku_grid(size):
    return [[{'index': j, 'value': ''} for j in range(size)] for i in range(size)]
def fill_grid_randomly(grid, row=0, col=0):
    size = len(grid)
    if row == size:
        return True  # グリッドの最後まで到達した場合、成功

    next_row, next_col = (row, col + 1) if col < size - 1 else (row + 1, 0)

    numbers = shuffle_array(1, size)
    for num in numbers:
        if isValidMove(grid, row, col, num):
            grid[row][col] = num  # 数字を配置
            if fill_grid_randomly(grid, next_row, next_col):
                return True  # 次のセルに進む
            grid[row][col] = ''  # バックトラック

    return False  # このセルに適切な数字が見つからない場合

def shuffle_array(start, end):
    array = list(range(start, end + 1))
    random.shuffle(array)
    return array
def remove_numbers(grid, difficulty):
    total_cells = len(grid) * len(grid)
    cells_to_remove = int(total_cells * 0.2)  # 難易度に応じて調整

    while cells_to_remove > 0:
        row = random.randint(0, len(grid) - 1)
        col = random.randint(0, len(grid) - 1)

        if grid[row][col]['value'] != '':
            grid[row][col]['value'] = ''
            cells_to_remove -= 1
