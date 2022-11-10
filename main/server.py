from flask import Flask, flash, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
app=Flask(__name__)
CORS(app)

@app.route('/plagiarism',methods=['GET'])

def get():
    return {
        'File':"dummy.py", 
        "Percentage": 'yryfyfhv', 
        }

@app.route("/upload", methods=["POST"])
def upload_file():
  print('post request')
  if request.method == 'POST':
      f = request.files['file']
      print(f)
      f.save(secure_filename(f.filename))
      myFile = open(f.filename,'r').read()
      print(f.filename, ' uploaded');
      print(myFile)
      return jsonify({'success':True, 'message': myFile})
  return jsonify({'success':False, 'message': "file upload failed"})

if __name__ == '__main__':
    app.run(port=5000,debug=True)