import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setRankedLadder } from '../actions/RankingActions';

class Ranking extends Component {
  static fetchLadder(rankingFromLocalStorage, newRankingItem) {
    if (rankingFromLocalStorage === null
      || rankingFromLocalStorage === []) {
      return [
        JSON.parse(newRankingItem),
      ];
    }
    if (rankingFromLocalStorage.length > 1) {
      return [
        ...rankingFromLocalStorage,
        JSON.parse(newRankingItem),
      ];
    }
    return [
      rankingFromLocalStorage,
      JSON.parse(newRankingItem),
    ];
  }

  componentDidMount() {
    const rankingFromLocalStorage = JSON.parse(localStorage.getItem('ranking')).flat();
    const {
      name,
      imageUrl,
      score,
      toSetRankedLadder,
    } = this.props;

    if (((name === '' && imageUrl === '') && score === 0)) {
      return rankingFromLocalStorage
        ? toSetRankedLadder(rankingFromLocalStorage)
        : toSetRankedLadder(null);
    }

    const newRankingItem = JSON.stringify({ name, score, imageUrl });

    const newLadder = Ranking.fetchLadder(rankingFromLocalStorage, newRankingItem);
    console.log(newLadder);
    const sortDesc = (a, b) => b.score - a.score;
    const sortedLadder = [...newLadder].sort(sortDesc);
    localStorage.setItem('ranking', JSON.stringify(sortedLadder.flat()));
    return toSetRankedLadder(sortedLadder.flat());
  }

  render() {
    const { rankedLadder } = this.props;
    return (
      <div>
        <h1>Ranking</h1>
        <ol>
          { rankedLadder !== null ? rankedLadder.map(
            (rank, index) => (
              <li key={`${rank.name}_${rank.score}_${index + 1}`}>
                <div>
                  <img src={rank.imageUrl} alt={`${rank.name} grAvatar`} />
                </div>
                <div>
                  <div>
                    {`${rank.name} pontuou `}
                    <span className="rank-score">
                      {`${rank.score}`}
                    </span>
                  </div>
                </div>
              </li>
            ),
          ) : <li>Nenhum registro</li> }
        </ol>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toSetRankedLadder: (rankedLadder) => dispatch(setRankedLadder(rankedLadder)),
});

const mapStateToProps = (
  {
    gameReducer: {
      name, imageUrl, score, rankedLadder,
    },
  },
) => ({
  name, imageUrl, score, rankedLadder,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  score: PropTypes.number,
  toSetRankedLadder: PropTypes.func.isRequired,
  rankedLadder: PropTypes.arrayOf(PropTypes.object),
};

Ranking.defaultProps = {
  name: '',
  imageUrl: '',
  score: 0,
  rankedLadder: [],
};
