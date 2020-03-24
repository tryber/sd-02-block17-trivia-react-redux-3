import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Answers from './Answers';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
    }

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.setState((state) => ({ questionNumber: state.questionNumber + 1 }));
  }

  // counter() {
  //   setTimeout(this.nextQuestion(), 30000);
  // }

  render() {
    const { results } = this.props;
    const { questionNumber } = this.state;
    const currentQuestion = results.map(({ question }) => question);
    const currentCategory = results.map(({ category }) => category);
    console.log(this.state, results)
    return (
      <div>
        <div>
          <p>{currentCategory[questionNumber]}</p>
          <h3>{currentQuestion[questionNumber]}</h3>
          {/* <p>{this.counter()}</p> */}
        </div>
        <div>
          {/* <Answers question={currentQuestion}/> */}
        </div>
        <div>
          {
            questionNumber < 4
              ? <button type="button" onClick={this.nextQuestion}>PRÓXIMA</button>
              : <Link to='/feedback'><button type="button">FINALIZAR</button></Link>
          }
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
}

const mapStateToProps = ({ getQuestions: { results } }) => ({ results });

export default connect(mapStateToProps)(Questions);
