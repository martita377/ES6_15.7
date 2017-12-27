'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            resultList: [],
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                }
            });
        }
    }, {
        key: 'format',
        value: function format(times) {
            return this.pad0(times.minutes) + ':' + this.pad0(times.seconds) + ':' + this.pad0(Math.floor(times.milliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var _state$times = this.state.times,
                minutes = _state$times.minutes,
                seconds = _state$times.seconds,
                milliseconds = _state$times.milliseconds;


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
    }, {
        key: 'stop',
        value: function stop() {
            if (this.state.running) {
                this.setState({
                    running: false
                });
                clearInterval(this.watch);
            }
        }
    }, {
        key: 'zero',
        value: function zero() {
            if (!this.state.running) {
                this.reset();
            }
        }
    }, {
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: 'save',
        value: function save() {
            this.addTimeToList(this.format(this.state.times));
        }
    }, {
        key: 'addTimeToList',
        value: function addTimeToList(time) {
            this.setState(function (prevState, props) {
                return {
                    resultList: [].concat(_toConsumableArray(prevState.resultList), [{ 'time': time, 'id': new Date().getTime() }])
                };
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.stop();
            this.setState({
                resultList: []
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.start.bind(this) },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.stop.bind(this) },
                        'Stop'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.zero.bind(this) },
                        'Reset'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.save.bind(this) },
                        'Save'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.clear.bind(this) },
                        'Clear'
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    this.format(this.state.times)
                ),
                React.createElement(
                    'ol',
                    { className: 'results' },
                    this.state.resultList.map(function (item) {
                        return React.createElement(
                            'li',
                            { key: item.id },
                            item.time
                        );
                    })
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.querySelector('.stopwatch'));
