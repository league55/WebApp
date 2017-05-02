import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Jumbotron, Button, ButtonGroup, FormControl, FormGroup, Form} from 'react-bootstrap';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import ArticleEditor from './ArticleEditor';
import {postArticle, saveArticle} from '../../actions/articles';
import {loadCategories} from "../../actions/categories";
import {FINISHED, IN_PROGRESS} from "../../constants/appConstants";

class Composer extends React.Component {

  constructor(props) {
    super(props);
    const savedState = this.props.savedIncompleteState ?
      EditorState.createWithContent(convertFromRaw(this.props.savedIncompleteState.content))
      : EditorState.createEmpty();
    this.state = this.state ? this.state : {editorState: savedState};
    this.getCategories = this._getCategories.bind(this);

    this.getValidationState = this._getValidationState.bind(this);
    this.onEditorStateUpdate = this._onEditorStateUpdate.bind(this);
    this.handleTitleChange = this._handleTitleChange.bind(this);
    this.handleCategoryIdChange = this._handleCategoryIdChange.bind(this);
  }

  _onEditorStateUpdate(editorState) {
    this.setState(Object.assign(this.state, {editorState: editorState})); // eslint-disable-line
  }

  _handleTitleChange(e) {
    this.setState(Object.assign(this.state, {title: e.target.value})); // eslint-disable-line
  }

  _handleCategoryIdChange(e) {
    this.setState(Object.assign(this.state, {categoryId: e.target.value})); // eslint-disable-line
  }

  _getValidationState() {
    if (!this.props.title) return null;
    const length = this.props.title.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    return 'error';
  }

  render() {
    const onClickSave = () => {
      this.props.handleClickSave(Object.assign(this.state, {author: {userName: this.props.userName}}));
    };
    const onClickPost = () => {
      this.props.handleClickPost(Object.assign(this.state, {author: {userName: this.props.userName}}));
    };
    return (
      <Row>
        <Col md={12}>
          <Jumbotron>
            <Row>
              <Form horisontal>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationState()}
                >
                  <FormControl
                    type="text"
                    value={this.props.title}
                    placeholder="Заголовок"
                    onChange={this.handleTitleChange}
                  />
                  <FormControl.Feedback />
                  <FormControl
                    componentClass="select"
                    onChange={this.handleCategoryIdChange}
                    value={this.props.categoryId}
                  >{this.getCategories()}</FormControl>
                </FormGroup>
              </Form>
            </Row>
            <ArticleEditor
              editorState={this.state.editorState}
              onEditorStateUpdate={this.onEditorStateUpdate}
              handleTitleChange={this.handleTitleChange}
              handleCategoryIdChange={this.handleCategoryIdChange}
              title={this.state.title}
              categoryId={this.state.categoryId}
            />
            <Row>
              <Col md={6} mdOffset={6}>
                <ButtonGroup justified>
                  <ButtonGroup>
                    <Button onClick={onClickSave}>Сохранить</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button bsStyle="primary" onClick={onClickPost}>Запостить</Button>
                  </ButtonGroup>
                </ButtonGroup>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
    );
  }

  _getCategories() {
    if (!this.props.categories) {
      this.props.loadCategories();
    }
    else {
      const realCategories = this.props.categories.map(cat => {
        return <option value={cat.categoryId} key={`select.option.${cat.categoryId}`}>{cat.categoryName}</option>;
      });
      return [<option value="latest">Выберите категорию</option>].concat(realCategories);
    }
    return {};
  }
}


Composer.propTypes = {
  handleClickSave: React.PropTypes.func,
  handleClickPost: React.PropTypes.func,
  savedIncompleteState: React.PropTypes.object,
  loadCategories: React.PropTypes.func,
  categories: React.PropTypes.array,
  userName: React.PropTypes.string,
  title: React.PropTypes.string,
  categoryId: React.PropTypes.string,
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  categories: state.categories,
  savedIncompleteState: state.articles.get(IN_PROGRESS)

});

const mapDispatchToProps = (dispatch) => ({
  handleClickPost(article) {
    const contentState = article.editorState.getCurrentContent();
    const articleBody = {
      title: article.title,
      categoryId: article.categoryId,
      content: convertToRaw(contentState),
      status: FINISHED
    };
    dispatch(postArticle(articleBody, article.author));
  },
  handleClickSave(article) {
    const contentState = article.editorState.getCurrentContent();
    const articleBody = {
      title: article.title,
      categoryId: article.categoryId,
      content: convertToRaw(contentState),
      status: IN_PROGRESS
    };
    dispatch(saveArticle(articleBody, article.author));
  },
  loadCategories() {
    dispatch(loadCategories());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Composer);
