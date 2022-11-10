import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      CompareURL: '',
    };

    this.handleUploadCompare = this.handleUploadCompare.bind(this);
  }
  
  handleUploadCompare(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://127.0.0.1:6000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      console.log(response)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadCompare}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.CompareURL} alt="files" />
      </form>
    );
  }
}

export default Main;