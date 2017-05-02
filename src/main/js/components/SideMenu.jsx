import React from 'react';
import {routerContext as RouterType} from 'react-router/PropTypes';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import {loadCategories} from "../actions/categories";

const wellStyles = {minWidth: 250, margin: '133px auto 10px'};

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
      <div className="well sidebar-nav-fixed " style={wellStyles}>
        <Link
          to={`/latest`}
          key={`link.latest`}
          bsSize="small"
          className="btn btn-sm btn-primary btn-block">Свежие</Link>
        {this.getSideMenuItems()}
      </div>
    )
      ;
  }

  getSideMenuItems() {
    if (this.props.categories) {
      return this.props.categories.filter((cat) => cat.isActive).map((cat) => {
        return (
          <Link
            to={`/category/${cat.categoryId}`}
            key={`link.${cat.categoryId}`}
            bsSize="small"
            className="btn btn-sm btn-default btn-block">{cat.categoryName}</Link>);
      });
    }
    return "";
  }
}


SideMenu.contextTypes = {
  router: RouterType.isRequired
};

SideMenu.propTypes = {
  categories: React.PropTypes.array,
  loadCategories: React.PropTypes.func
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  loadCategories() {
    dispatch(loadCategories());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);

