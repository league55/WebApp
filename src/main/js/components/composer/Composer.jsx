import React from 'react';
import {connect} from 'react-redux';
import { Row, Col, Jumbotron, Button} from 'react-bootstrap';
import ModeSwitcher from './ModeSwitcher';
import Editor from './Editor';
import Preview from './Preview';
import {EDITING, PREVIEW} from '../../constants/actionTypes';
import saveAndSwitchMode from '../../actions/articles';

class Composer extends React.Component {

  render() {
    const {article, mode} = this.props;
    return (
      <Row>
        <Col md={10} mdOffset={2}>
          <Jumbotron className="text-center ">
            <ModeSwitcher activeKey={mode} handleSelect={this.props.handleSelect}/>
            {mode === EDITING && <Editor article={article}/>}
            {mode === PREVIEW && <Preview article={article}/>}
            <Row>
              <Col md={3} mdOffset={9}>
                <Button bsStyle="primary">Save</Button>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Composer);
