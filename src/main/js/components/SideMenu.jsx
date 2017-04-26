import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import {loadCategories} from "../actions/categories";

const wellStyles = {maxWidth: 200, margin: '133px auto 10px'};

class SideMenu extends React.Component {

  componentDidMount() {
    if (!this.props.categories || this.props.categories.length === 0) {
      this.props.loadCategories();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className="well sidebar-nav-fixed affix" style={wellStyles}>
           {this.getSideMenuItems()}
         <Button bsStyle="primary" bsSize="small" block>Block level button</Button>
         <Button bsSize="small" block>Block level button</Button>
      </div>
    );
  }

  getSideMenuItems() {
    if (this.props.categories) {
      return this.props.categories.map((cat) => <Button bsSize="small" block>{cat.categoryName}</Button>);
    }
    return "";
  }
}

SideMenu.propTypes = {
  categories: React.PropTypes.array,
  loadCategories: React.PropTypes.func
};

const mapStateToProps = (state) => ({
  categories: state.categories.filter((cat) => cat.isActive)
});

const mapDispatchToProps = (dispatch) => ({
  loadCategories() {
    dispatch(loadCategories());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);

