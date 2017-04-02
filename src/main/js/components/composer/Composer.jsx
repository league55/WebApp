import React from 'react';
import {connect} from 'react-redux';
import { Row, Col, Jumbotron, Button} from 'react-bootstrap';
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
  }

  _onEditorStateUpdate(editorState) {
    this.setState({
      editorState
    });
  }

  render() {
    const {mode} = this.props;
    const onClickSave = () => {
      this.props.handleClick(this.state.editorState);
    };
    return (
      <Row>
        <Col md={10} mdOffset={2}>
          <Jumbotron className="text-center ">
            <ModeSwitcher activeKey={mode} handleSelect={this.props.handleSelect}/>
            {mode === EDITING &&
            <ArticleEditor editorState={this.state.editorState} onEditorStateUpdate={this.onEditorStateUpdate}/>}
            {mode === PREVIEW && <Preview editorState={this.state.editorState}/>}
            <Row>
              <Col md={3} mdOffset={9}>
                <Button bsStyle="primary" onClick={onClickSave}>Save</Button>
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
  mode: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  mode: state.composer.mode
});

const mapDispatchToProps = (dispatch) => ({
  handleSelect(mode) {
    dispatch(saveAndSwitchMode(mode));
  },
  handleClick(article) {
    const contentState = article.getCurrentContent();
    const articleBody = {
      id: Math.floor(Math.random() * 100),
      content: convertToRaw(contentState)
    };
    dispatch(saveArticle(articleBody));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Composer);
