import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here
  componentDidUpdate(){
    this.timer = React.createRef()
    console.log(this.timer.current)
  }

//The readme says to write "this.timer.current.style.color =  "#" + Math.floor(Math.random() * 16777215).toString(16);"
// in componentDidUpdate, and the tests pass when I do so. But the code itself is completely broken, erroring out the page.
// When attempting to log it out dot-by-dot, I can only make it up to this.timer.current. Chaining 'style' onto it breaks the entire thing.
// Flatiron might need to rework this lab.

shouldComponentUpdate(nextProps, nextState) {
  if (this.state.time === nextState.time) {
    return false
  }
  return true
}

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  
  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
