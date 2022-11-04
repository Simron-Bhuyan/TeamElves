from flask import Flask
from flask_cors import CORS
from moss import hey
import datetime
  
x = datetime.datetime.now()
  
# Initializing flask app
app = Flask(__name__)
  
app = Flask(__name__)
app.static_folder='static'
CORS(app)
  
# Route for seeing a data
@app.route('/data')
def get_time():
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x,
        "programming":"python"
        }
  
@app.route('/test')
def test():
    url=hey()
    return {"URL":url}
      
# Running app
if __name__ == '__main__':
    app.run(port=5000,debug=True)