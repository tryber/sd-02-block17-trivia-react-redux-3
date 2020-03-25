import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { currentCount: 30 };
  }


  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer() {
    const { currentCount } = this.state;
    this.setState({ currentCount: currentCount - 1 });

    if (currentCount === 1) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { currentCount } = this.state;
    return (
      <div>{currentCount}</div>
    );
  }
}

export default Clock;
