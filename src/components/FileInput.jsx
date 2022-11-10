import React from 'react'

function FileInput() {
    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (file != null) {
            const data = new FormData();
            data.append('file_from_react', file);

            let response = await fetch('/url_route', { method: 'post', body: data, });

            let res = await response.json();
            if (res.status !== 1) {
                alert('Error uploading file');
            }
        }
    };
    return (
        <div>
            <form> Input files
                <input type="file" onChange={this.uploadFile}>
                </input>
            </form>
        </div>
    )
}

export default FileInput