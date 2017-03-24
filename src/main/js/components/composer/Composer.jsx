import React from 'react';
import {connect} from 'react-redux';
import { Row, Col, Jumbotron, Button} from 'react-bootstrap';
import ModeSwitcher from './ModeSwitcher';
import ArticleEditor from './ArticleEditor';
import Preview from './Preview';
import {EditorState} from 'draft-js';
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
    let articleUnderEdition = this.props.article;
    const onClickSave = () => {
      this.props.handleClick(articleUnderEdition);
    };
    return (
      <Row>
        <Col md={10} mdOffset={2}>
          <Jumbotron className="text-center ">
            <ModeSwitcher activeKey={mode} handleSelect={this.props.handleSelect}/>
            {mode === EDITING && <ArticleEditor editorState={this.state.editorState} onEditorStateUpdate={this.onEditorStateUpdate}/>}
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
  mode: React.PropTypes.string,
  article: React.PropTypes.object
};

const mapStateToProps = (state) => ({
  mode: state.composer.mode,
  article: state.articles.articlesList[1]
});

const mapDispatchToProps = (dispatch) => ({
  handleSelect(mode) {
    dispatch(saveAndSwitchMode(mode));
  },
  handleClick(article) {
    dispatch(saveArticle(article));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Composer);
