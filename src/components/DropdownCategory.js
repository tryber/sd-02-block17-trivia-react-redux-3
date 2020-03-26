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
    const { category, saveChange, selected } = this.props;
    return (
      <select value={selected.id} onChange={({ target }) => saveChange(target.value)}>
        <option value="">Random</option>
        {category.map(({ name, id }) => (<option value={id} key={name}>{name}</option>))}
      </select>
    );
  }
}

const mapStateToProps = ({ categoryReducer: { category, selected } }) => ({ category, selected });

const mapDispatchToProps = (dispatch) => ({
  saveCategory: (results) => dispatch(requestCategory(results)),
  saveChange: (change) => dispatch(changeC(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownCategory);

DropdownCategory.propTypes = {
  saveCategory: PropTypes.func.isRequired,
  category: PropTypes.instanceOf(Array),
  saveChange: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Object),
};

DropdownCategory.defaultProps = {
  category: [],
  selected: {},
};
