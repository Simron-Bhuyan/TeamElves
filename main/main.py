from flask import Flask, request, jsonify
from flask_cors import CORS
from moss import hey
# import datetime
# import os
import json

  
# x = datetime.datetime.now()
  
app = Flask(__name__)
# app.static_folder='static'
CORS(app)

data={'code':'inside test3'}
  
# Route for seeing a data
@app.route('/api', methods=['GET','POST'])
def get_time():
    data=request.data.decode('utf-8')
    reqdData=json.loads(data)
    # print(reqdData['code'])
    file = open("test3.py",'w')
    file.write(reqdData['code'])
    file.close()
    return {}
  
@app.route('/test')
def test():
    # print(data['code'])
    # print('heyyyy')
    url=hey()
    # url='ok'
    return {"URL":url}
      
# @app.route('/okay')
# def okay():
#     # url=hey()
#     return {"URL":"YES"}



# Running app
if __name__ == '__main__':
    app.run(port=5000,debug=True)