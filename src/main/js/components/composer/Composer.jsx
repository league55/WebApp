import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Jumbotron, Button, ButtonGroup} from 'react-bootstrap';
import {EditorState, convertToRaw} from 'draft-js';
import ModeSwitcher from './ModeSwitcher';
import ArticleEditor from './ArticleEditor';
import Preview from './Preview';
import {EDITING, PREVIEW} from '../../constants/actionTypes';
import {saveAndSwitchMode, saveArticle} from '../../actions/articles';
import {loadCategories} from "../../actions/categories";

class Composer extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.state ? this.state : {editorState: EditorState.createEmpty()};

    this.onEditorStateUpdate = this._onEditorStateUpdate.bind(this);
    this.handleTitleChange = this._handleTitleChange.bind(this);
    this.handleCategoryIdChange = this._handleCategoryIdChange.bind(this);
  }

  _onEditorStateUpdate(editorState) {
    this.setState(Object.assign(this.state, {editorState: editorState})); // eslint-disable-line
  }

  _handleTitleChange(title) {
    this.setState(Object.assign(this.state, {title: title})); // eslint-disable-line
  }

  _handleCategoryIdChange(categoryId) {
    this.setState(Object.assign(this.state, {categoryId: categoryId})); // eslint-disable-line
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
}


Composer.propTypes = {
  handleSelect: React.PropTypes.func,
  handleClick: React.PropTypes.func,
  userName: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName
});

const mapDispatchToProps = (dispatch) => ({
  handleSelect(mode) {
    dispatch(saveAndSwitchMode(mode));
  },
  handleClickPost(article) {
    const contentState = article.editorState.getCurrentContent();
    const articleBody = {
      title: article.title,
      categoryId: article.categoryId,
      content: convertToRaw(contentState),
      status: "FINISHED"
    };
    dispatch(saveArticle(articleBody, article.author));
  },
  handleClickSave(article) {
    const contentState = article.editorState.getCurrentContent();
    const articleBody = {
      title: article.title,
      categoryId: article.categoryId,
      content: convertToRaw(contentState),
      status: "IN_PROGRESS"
    };
    dispatch(saveArticle(articleBody, article.author));
  },
  loadCategories() {
    dispatch(loadCategories());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Composer);
