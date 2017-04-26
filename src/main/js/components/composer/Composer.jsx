import React from 'react';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import {Row, Col, Jumbotron, Button, ButtonGroup} from 'react-bootstrap';
import {EditorState, convertToRaw} from 'draft-js';
import ModeSwitcher from './ModeSwitcher';
import ArticleEditor from './ArticleEditor';
import Preview from './Preview';
import {EDITING, PREVIEW} from '../../constants/actionTypes';
import {saveAndSwitchMode, saveArticle} from '../../actions/articles';

class Composer extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.state ? this.state : {editorState: EditorState.createEmpty()};

    this.onEditorStateUpdate = this._onEditorStateUpdate.bind(this);
    this.handleTitleChange = this._handleTitleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _onEditorStateUpdate(editorState) {
    this.setState(Object.assign(this.state, {editorState: editorState})); // eslint-disable-line
  }

  _handleTitleChange(title) {
    this.setState(Object.assign(this.state, {title: title})); // eslint-disable-line
  }

  render() {
    const {mode} = this.props;
    const onClickSave = () => {
      this.props.handleClick(Object.assign(this.state, {author: {userName: this.props.userName}}));
    };
    return (
      <Row>
        <Col md={12}>
          <Jumbotron>
            <ModeSwitcher activeKey={mode} handleSelect={this.props.handleSelect}/>
            {mode === EDITING &&
            <ArticleEditor
              editorState={this.state.editorState}
              onEditorStateUpdate={this.onEditorStateUpdate}
              handleTitleChange={this.handleTitleChange}
              title={this.state.title}
            />}
            {mode === PREVIEW && <Preview editorState={this.state.editorState} title={this.state.title}/>}
            <Row>
              <Col md={6} mdOffset={6}>
                <ButtonGroup justified>
                  <ButtonGroup>
                    <Button onClick={onClickSave}>Сохранить</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button bsStyle="primary" onClick={onClickSave}>Запостить</Button>
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
  userName: React.PropTypes.string,
  mode: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  mode: state.composer.mode,
  userName: state.auth.userName
});

const mapDispatchToProps = (dispatch) => ({
  handleSelect(mode) {
    dispatch(saveAndSwitchMode(mode));
  },
  handleClick(article) {
    const contentState = article.editorState.getCurrentContent();
    const articleBody = {
      title: article.title,
      content: convertToRaw(contentState),
      status: "FINISHED"
    };
    dispatch(saveArticle(articleBody, article.author));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Composer);
