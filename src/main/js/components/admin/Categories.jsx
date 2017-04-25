import React from "react";
import axios from "axios";
import {Table, Button, ButtonToolbar, FormControl, Checkbox} from 'react-bootstrap';
import "../CommentList.scss";
// import Input from "react-toolbox/components/input/Input.d";
// import { Switch }from "react-toolbox/lib/switch";

class Categories extends React.Component {

  constructor() {
    super();
    this.state = {
      newCategory: {categoryName: "", isActive: false},
      newSubCategory: {subCategoryName: "", isActive: false}
    };
    this.loadCategories = this.loadCategories.bind(this);
    this.toggleNewCategoryActive = this.toggleNewCategoryActive.bind(this);
    this.toggleNewCategoryName = this.toggleNewCategoryName.bind(this);
    this.getAddCategoryRow = this.getAddCategoryRow.bind(this);
    this.categoryAPI = this.categoryAPI.bind(this);
  }

  componentDidMount() {
    this.loadCategories();
  }

  toggleNewCategoryName(e) {
    this.setState(Object.assign(this.state, {
      newCategory: {
        categoryName: e.target.value,
        isActive: this.state.newCategory.isActive
      }
    }));
  }

  categoryAPI(action, id) {
    switch (action) {
      case "NEW_CATEGORY":
        axios.post('/categories', this.state.newCategory);
        break;
      case "DELETE_CATEGORY":
        axios.delete(`/categories/${id}`);
        break;
      case "TOGGLE_CATEGORY":
        axios.post(`/categories/mode/${id}`);
        break;
      default:
        break;
    }
    this.loadCategories();
    this.forceUpdate();
  }

  toggleNewCategoryActive() {
    this.setState(Object.assign(this.state, {
      newCategory: {
        categoryName: this.state.newCategory.categoryName,
        isActive: !this.state.newCategory.isActive
      }
    }));
  }

  loadCategories() {
    let categories;
    axios.get('/categories')
      .then(
        success => {
          categories = success.data.map(cat => this.getCatRow(cat));
          this.setState(Object.assign(this.state, {categories: categories})); // eslint-disable-line
        },
        failure => console.log(failure)
      );
  }

  // {/*<td><Switch checked={cat.isActive} onChange={axios.post(`/categories/mode/${cat.categoryId}`, {})}/></td>*/}

  getCatRow(cat) {
    return (<tr key={cat.categoryName}>
      <td><Button bsStyle="success" bsSize="xs">+</Button></td>
      <td>{cat.categoryName}</td>
      <td>{cat.timesUsed}</td>
      <td><Checkbox checked={cat.isActive}/></td>
      <td><ButtonToolbar>
        <Button
          bsStyle="warning"
          onClick={() => this.categoryAPI("TOGGLE_CATEGORY", cat.categoryId)}>disable
        </Button>
        <Button bsStyle="danger" onClick={() => this.categoryAPI("DELETE_CATEGORY", cat.categoryId)}>delete</Button>
      </ButtonToolbar></td>
    </tr>);
  }

  render() {
    return (<div>
        <Table striped bordered condensed hover>
          {Categories.getHeaderRow()}
          <tbody>
          {this.state ? this.state.categories : ""}
          {this.getAddCategoryRow()}
          </tbody>
        </Table>
      </div>
    );
  }

  static getHeaderRow() {
    return (
      <thead>
      <tr>
        <td>+</td>
        <td>Название</td>
        <td>Использована раз</td>
        <td>Активная</td>
        <td/>
      </tr>
      </thead>
    );
  }

  getAddCategoryRow() {
    return (<tr>
      <td/>
      <td className="td-input"><FormControl className="table-input" onChange={this.toggleNewCategoryName}/></td>
      <td>0</td>
      <td className="td-input"><Checkbox onChange={this.toggleNewCategoryActive}/></td>
      <td><Button
        bsStyle="success"
        onClick={() => this.categoryAPI("NEW_CATEGORY")}>Сохранить</Button></td>
    </tr>);
  }

}

export default Categories;
