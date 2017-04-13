import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ArticleEditora from './ArticleEditor.css'; // eslint-disable-line


class ImageUploader extends React.Component {

  constructor(props) {
    super(props);
    this.onDrop = this._onDrop.bind(this);
    this.close = this._close.bind(this);
    this.open = this._open.bind(this);
    this.state = {showModal: false, files: []};
  }

  _close() {
    this.props.handleImagesAdd(this.state.files);
    this.setState(Object.assign({}, this.state, {showModal: false}));
  }

  _open() {
    this.setState(Object.assign({}, this.state, {showModal: true}));
  }


  _onDrop(files) {
    const data = new FormData();
    data.append('file', files[0]);
    axios.post('/static', data);

    this.setState(Object.assign({}, this.state, {files: this.state.files.concat(files)}));
  }

  render() {
    return (<div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >Image</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <div className="">
            <Modal.Header>
              <Modal.Title>Загрузить изображение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Dropzone ref="dropzone" className="Dropzone" onDrop={this.onDrop}>
                <div>Вы можете перетянуть сюда изображения, или кликните что бы открыть файловый менеджер</div>
              </Dropzone>
              {this.state.files.length > 0 ? <div>
                  <h2>Загружаю файлы... {this.state.files.length}</h2>
                    <div>
                      {this.state.files.map((file, i) => <img src={file.preview} role="presentation" key={i}/>)}
                    </div>
                </div> : null}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  handleImagesAdd: React.PropTypes.func
};

export default ImageUploader;
