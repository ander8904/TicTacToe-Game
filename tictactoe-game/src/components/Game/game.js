import React from 'react';
import './game.css'
import { calculateWinner } from '../CalculateWinner/calculateWinner';
import { Board } from '../Board/board';
import ReactDOM from 'react-dom';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Movimiento #' + move :
        'Al inicio del juego';
      return (

        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    status = 'Inicia jugador: ' + winner;
    if (winner) {
      status = 'Ganador: ' + winner;
    }
    else {
      status = 'Siguiente jugador: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (


      <div className="game is-block">
        <div className='level'>
          <div className='level-item'>
            <div className="game-info">
              <div className='subtitle has-text-white'>{
                status 
                
              }
               
              </div>
              {/*<ol>{moves}</ol>*/}
            </div>
          </div>
        </div>
        <div className='level'>
          <div className='level-item'>
            <div className="box caja game-board">
           
              <Board props={this.props}
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
          </div>
        </div>

      </div>


    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

