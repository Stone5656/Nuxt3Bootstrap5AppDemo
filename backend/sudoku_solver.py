def isValidMove(grid, row, col, num):
    num = int(num)
    size = len(grid)
    sqrt_size = int(size ** 0.5)

    # 同じ行または列に同じ数字があるかチェック
    for i in range(size):
        if grid[row][i] == num or grid[i][col] == num:
            return False

    # 同じサブグリッドに同じ数字があるかチェック
    startRow = row - row % sqrt_size
    startCol = col - col % sqrt_size
    for i in range(sqrt_size):
        for j in range(sqrt_size):
            if grid[i + startRow][j + startCol] == num:
                return False

    return True
def isComplete(grid):
    return all(all(cell != '' for cell in row) for row in grid)
def isPuzzleValid(grid):
    size = len(grid)
    for row in range(size):
        for col in range(size):
            num = grid[row][col]
            if num != '':
                grid[row][col] = ''  # 一時的にセルを空にする
                if not isValidMove(grid, row, col, num):
                    return False
                grid[row][col] = num  # セルの値を元に戻す
    return True
