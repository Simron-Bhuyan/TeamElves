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
      return myFile
  return "unsu"
# @app.route('/url_route', methods=['POST'])
# def upload_file(): 
#     """Handles the upload of a file.""" 
# d = {} 
# try: 
    # file = request.files['file_from_react'] 
    # filename = file.filename 
    # print(f"Uploading file {filename}") 
    # file_bytes = file.read() 
    # file_content = BytesIO(file_bytes).readlines() 
    # print(file_content) 
    # d['status'] = 1 
    # except Exception as e: 
    #     print(f"Couldn't upload file {e}") 
    #     d['status'] = 0 
    # @app.route('/api', methods=['GET','POST'])
    # def get_time():
    #     data=request.data.decode('utf-8')
    #     reqdData=json.loads(data)
    #     # print(reqdData['code'])
    #     file = open("test3.py",'w')
    #     file.write(reqdData['code'])
    #     file.close()
    #     return {}
    #     return jsonify(d)

if __name__ == '__main__':
    app.run(port=8000,debug=True)