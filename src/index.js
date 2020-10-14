import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                boardMove: {
                    row: null,
                    col: null,
                },
            }],
            currentPlayer: 'X',
            stepNumber: 0,
        };
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (!squares[i] && !calculateWinner(squares)) {
            // set move
            let col = i % 3;
            let row = (i - col) / 3;

            squares[i] = this.state.currentPlayer;
            const currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
            this.setState({
                history: history.concat([{
                    squares: squares,
                    boardMove: {
                        row: row,
                        col: col,
                    },
                }]),
                currentPlayer: currentPlayer,
                stepNumber: history.length,
            });
        }
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            currentPlayer: (step % 2 === 0) ? 'X' : 'O',
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    <p>{"" + history[move].boardMove.col + " " + history[move].boardMove.row}</p>
                </li>
            );
        });

        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.currentPlayer);
        }

        return (
            <div className="game">
            <Clock />
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    tick() {
        this.setState({date: new Date()});
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toggle: true};

        this.clickHandle = (e) => {
            this.handleClick();
        }
    }
    handleClick = () => {
        this.setState(state => ({
            toggle: !this.state.toggle,
        }));
    }
    render() {
        return (
            <button onClick={this.clickHandle}>
                {this.state.toggle ? 'ON' : 'OFF'}
            </button>
        );
    }
}

function UserGreeting(prop) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(prop) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function WarningBanner(props) {
    if (!props.warn) return null;

    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    handleToggleClick() {
        this.setState(state => ({
            showWarning: !state.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

function ListItems(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        <li key={number.toString()}>
            {number}
        </li>
    );

    return (
        <ul>{listItems}</ul>
    );
}
const list = [2,3,4,5,6];

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const change = event.target.value;

        this.setState({value: [event.target.value]});
    }

    handleSubmit(event) {
    
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ['coconut', 'mango']};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const selected = document.getElementById("flavor-options").selectedOptions;
        let selectedValues = [];
        for (let item of selected) {
            selectedValues.push(item.value);
        }
        this.setState({value: selectedValues});
    }
    handleSubmit(event) {
        let greetingString = this.state.value.length > 1 ? "the favorite flavors are: " : this.state.value.length > 0 ? "the favorite flavor is: " : "no flavors";
        alert(greetingString  + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select id="flavor-options" multiple={true} value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class ReservationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleChange} />
                </label>
            </form>
        );
    }
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil</p>;
    }
    return <p>The water would not boil.</p>;
}



const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit",
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}
function toSame(temp) {
    return temp;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.tempChange = this.tempChange.bind(this);
        this.state = {celsius: '', fahrenheit: ''};
    }

    tempChange(value, scale) {
        if (scale === "c") {
            const fahr = tryConvert(value, toFahrenheit);
            const cels = tryConvert(value, toSame);
            this.setState({fahrenheit: fahr, celsius: cels});
        } else {
            const fahr = tryConvert(value, toSame);
            const cels = tryConvert(value, toCelsius);
            this.setState({fahrenheit: fahr, celsius: cels});
        }
    }

    render() {
        const temperature = this.props.temperature;
        return (
            <div>
                <TemperatureInput temperature={this.state.celsius} scale="c" onTemperatureChange={this.tempChange} />
                <TemperatureInput temperature={this.state.fahrenheit} scale="f" onTemperatureChange={this.tempChange} />
            </div>
        );
    }
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value, this.props.scale);
    }
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperaturel in {scaleNames[scale]}:</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        ); 
    }
}
ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);