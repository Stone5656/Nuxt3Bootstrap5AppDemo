from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sudoku_solver import isValidMove, isComplete, isPuzzleValid
from sudoku_generator import create_sudoku_grid, fill_grid_randomly, remove_numbers

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sudoku.db'
db = SQLAlchemy(app)

class Cell(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    row = db.Column(db.Integer, nullable=False)
    col = db.Column(db.Integer, nullable=False)
    value = db.Column(db.Integer, nullable=False)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

@app.route('/validate_move', methods=['POST'])
def validate_move():
    data = request.json
    valid = isValidMove(data['grid'], data['row'], data['col'], data['num'])
    return jsonify({'valid': valid})
@app.route('/api/is_complete', methods=['POST'])
def api_is_complete():
    grid = request.json['grid']
    complete = isComplete(grid)
    return jsonify({'complete': complete})
@app.route('/api/is_puzzle_valid', methods=['POST'])
def api_is_puzzle_valid():
    grid = request.json['grid']
    valid = isPuzzleValid(grid)
    return jsonify({'valid': valid})
@app.route('/api/generate_sudoku', methods=['POST'])
def generate_sudoku():
    data = request.json
    grid_size = data.get('gridSize')
    grid = create_sudoku_grid(grid_size)
    fill_grid_randomly(grid)
    remove_numbers(grid, data.get('difficulty', 'easy'))
    return jsonify(grid)
@app.route('/api/create_sudoku_grid', methods=['POST'])
def api_create_sudoku_grid():
    data = request.json
    size = data.get('size')
    grid = create_sudoku_grid(size)
    return jsonify(grid)