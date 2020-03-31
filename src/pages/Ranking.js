import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Ranking(props) {
  const fetchRankingLadder = () => {
    const rankingFromLocalStorage = JSON.parse(localStorage.getItem('ranking'));
    const { name: playerName = '', imageUrl = '', score = '' } = props;
    const newRankingItem = (
      playerName !== '' && imageUrl !== '' && score !== '')
      ? JSON.stringify({ playerName, score, imageUrl })
      : null;
    const newLadder = rankingFromLocalStorage && newRankingItem !== null ? [
      ...rankingFromLocalStorage.filter((rankItem) => rankItem !== newRankingItem),
      JSON.parse(newRankingItem),
    ] : [JSON.parse(newRankingItem)];
    const sortDesc = (a, b) => b.score - a.score;
    newLadder.sort(sortDesc);
    localStorage.setItem('ranking', JSON.stringify(newLadder));
  };

  fetchRankingLadder();

  const rankingFromLocalStorage = JSON.parse(localStorage.getItem('ranking'));

  return (
    <div>
      <h1>Ranking</h1>
      <ol>
        { rankingFromLocalStorage !== undefined ? rankingFromLocalStorage.map(
          ({ playerName, score, imageUrl }, index) => (
            <li key={`${playerName}_${score}_${index + 1}`}>
              <div>
                <img src={imageUrl} alt={`${playerName} grAvatar`} />
              </div>
              <div>
                <div>
                  {`${playerName} pontuou`}
                  <span className="rank-score">
                    {`${score}`}
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

const mapStateToProps = ({ gameReducer: { name, imageUrl, score } }) => ({
  name, imageUrl, score,
});

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
