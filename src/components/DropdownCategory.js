import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCatergory from '../services/getCategory';
import requestCategory from '../actions/RequestCategory';
import changeC from '../actions/ChangeCategory';

class DropdownCategory extends React.Component {
  componentDidMount() {
    const { saveCategory } = this.props;
    getCatergory()
      .then(({ trivia_categories: category }) => saveCategory(category));
  }

  render() {
    const { category, saveChange, Cselected } = this.props;
    return (
      <div>
        <h4>Categoria:</h4>
        <select
          data-testid="question-category-dropdown"
          value={Cselected.id}
          onChange={({ target }) => saveChange(target.value)
          }
        >
          <option value="">Random</option>
          {category.map(({ name, id }) => (<option value={id} key={name}>{name}</option>))}
        </select >
      </div>
    );
  }
}

const mapStateToProps = ({ categoryReducer: { category, Cselected } }) => ({ category, Cselected });

const mapDispatchToProps = (dispatch) => ({
  saveCategory: (results) => dispatch(requestCategory(results)),
  saveChange: (change) => dispatch(changeC(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownCategory);

DropdownCategory.propTypes = {
  saveCategory: PropTypes.func.isRequired,
  category: PropTypes.instanceOf(Array),
  saveChange: PropTypes.func.isRequired,
  Cselected: PropTypes.instanceOf(Object),
};

DropdownCategory.defaultProps = {
  category: [],
  Cselected: {},
};
