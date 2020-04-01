import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { setRankedLadder } from '../actions/RankingActions';


class Ranking extends Component {
  static fetchLadder(rankingFromLocalStorage, newRankingItem) {
    console.log('actual ranking: ', rankingFromLocalStorage, 'new rank item: ', newRankingItem)
    if (rankingFromLocalStorage === null) {
      return [
        newRankingItem,
      ];
    }
    return [
      ...rankingFromLocalStorage,
      newRankingItem,
    ];
  }

  componentDidMount() {
    const {
      toSetRankedLadder,
    } = this.props;

    const rankingFromLocalStorage = localStorage.getItem('ranking') !== null ? JSON.parse(localStorage.getItem('ranking')) : null;

    const stateFromLocalStorage = localStorage.getItem('state') !== null ? JSON.parse(localStorage.getItem('state')) : null;
    console.log(rankingFromLocalStorage, stateFromLocalStorage);

    if (stateFromLocalStorage === null) {
      return rankingFromLocalStorage !== null
        ? toSetRankedLadder(rankingFromLocalStorage)
        : null;
    }

    const { player: { name, score, gravatarEmail } } = stateFromLocalStorage;
    const imageUrl = `https://www.gravatar.com/avatar/${MD5(gravatarEmail)}`;
    const newRankingItem = { name, score, imageUrl };

    const newLadder = Ranking.fetchLadder(rankingFromLocalStorage, newRankingItem);
    const sortDesc = (a, b) => b.score - a.score;
    const sortedLadder = [...newLadder].sort(sortDesc);
    console.log('novo rank: ', sortedLadder);

    localStorage.setItem('ranking', JSON.stringify(sortedLadder));
    localStorage.removeItem('state');
    return toSetRankedLadder(sortedLadder);
  }

  render() {
    const { rankedLadder } = this.props;

    console.log('state ranked ladder: ', rankedLadder, !!rankedLadder);

    if (rankedLadder.length === 0) return <li>Nenhum registro</li>;
    return (
      <div>
        <h1>Ranking</h1>
        <ol>
          { rankedLadder.map(
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
          ) }
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
      rankedLadder,
    },
  },
) => ({
  rankedLadder,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  toSetRankedLadder: PropTypes.func.isRequired,
  rankedLadder: PropTypes.arrayOf(PropTypes.object),
};

Ranking.defaultProps = {
  rankedLadder: [],
};
