class Stopwatch extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            running: false,
            resultList: [],
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        };
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        });
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.milliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        let { minutes, seconds, milliseconds } = this.state.times;

        milliseconds += 1;
        if (milliseconds >= 100) {
            seconds += 1;
            milliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState({
            times: {
                minutes: minutes,
                seconds: seconds,
                milliseconds: milliseconds
            }
        });
    }

    stop() {
        if (this.state.running) {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }

    zero() {
        if (!this.state.running) {
            this.reset();
        }
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    save() {
        this.addTimeToList(this.format(this.state.times));
    }

    addTimeToList(time) {
        this.setState((prevState, props) => ({
            resultList: [...prevState.resultList, {'time': time, 'id': new Date().getTime()}]
        }));
    }

    clear() {
        this.stop();
        this.setState({
            resultList: []
        });
    }

    render() {
        return (
            <div>
                <div className='controls'>
                    <a href='#' className='button' onClick={this.start.bind(this)}>Start</a>
                    <a href='#' className='button' onClick={this.stop.bind(this)}>Stop</a>
                    <a href='#' className='button' onClick={this.zero.bind(this)}>Reset</a>
                    <a href='#' className='button' onClick={this.save.bind(this)}>Save</a>
                    <a href='#' className='button' onClick={this.clear.bind(this)}>Clear</a>
                </div>
                <div>{this.format(this.state.times)}</div>
                <ol className="results">
                    {this.state.resultList.map(item => <li key={item.id}>{item.time}</li>)}
                </ol>
            </div>
        );
    }
}

ReactDOM.render(<Stopwatch/>, document.querySelector('.stopwatch'));