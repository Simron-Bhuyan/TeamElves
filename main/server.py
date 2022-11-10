# from flask import Flask, flash, request, redirect, url_for, send_from_directory
# from werkzeug.utils import secure_filename
# import os
# from flask_cors import CORS
# app=Flask(__name__)

# @app.route('/plagiarism',methods=['GET'])

# def get():
#     return {
#         'File':"dummy.py", 
#         "Percentage": 'yryfyfhv', 
#         }

# @app.route("/upload", methods=["POST"])
# def upload_file():
#   if request.method == 'POST':
#       f = request.files['file']
#       print(f)
#       f.save(secure_filename(f.filename))
#       return 'file uploaded successfully'
#   return "unsu"
# # @app.route('/url_route', methods=['POST'])
# # def upload_file(): 
# #     """Handles the upload of a file.""" 
# # d = {} 
# # try: 
#     # file = request.files['file_from_react'] 
#     # filename = file.filename 
#     # print(f"Uploading file {filename}") 
#     # file_bytes = file.read() 
#     # file_content = BytesIO(file_bytes).readlines() 
#     # print(file_content) 
#     # d['status'] = 1 
#     # except Exception as e: 
#     #     print(f"Couldn't upload file {e}") 
#     #     d['status'] = 0 
#     # @app.route('/api', methods=['GET','POST'])
#     # def get_time():
#     #     data=request.data.decode('utf-8')
#     #     reqdData=json.loads(data)
#     #     # print(reqdData['code'])
#     #     file = open("test3.py",'w')
#     #     file.write(reqdData['code'])
#     #     file.close()
#     #     return {}
#     #     return jsonify(d)

# if __name__ == '__main__':
#     app.run(port=8000,debug=True)
import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['cpp','c'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/upload'
@app.route('/plagiarism',methods=['GET'])
def get():
    return {
        'File':"dummy.py", 
        "Percentage": 'yryfyfhv', 
        }
@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",port=6000,use_reloader=False)

flask_cors.CORS(app, expose_headers='Authorization')