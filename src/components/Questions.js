import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
  render() {
    return (

    );
  }
}

const mapStateToProps = ({ results }) => ({ results })

export default connect(mapStateToProps)(Questions);
