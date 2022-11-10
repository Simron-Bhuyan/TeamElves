from flask import Flask, flash, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
import os
import gitext
from flask_cors import CORS
import nltk
import json
import difflib
app=Flask(__name__)
CORS(app)

################################################################


keep_tokens = {
    "[":1,
    "]":1,
    "#":1,
    "(":1,
    ")":1,
    "<":1,
    ">":1,
    "%":1,
    ":":1,
    ";":1,
    ".":1,
    "?":1,
    "*":1,
    "+":1,
    "-":1,
    "/":1,
    "^":1,
    "&":1,
    "|":1,
    "~":1,
    "!":1,
    "=":1,
    "++":1,
    "&&":1,
    "--":1,
    "+=":1,
    "-=":1,
    "!=":1,
    "Loop":1,
    "conditional":1,
    "==": 1,
    "<": 1,
    ">": 1,
    ">=": 1,
    "<=": 1,
    "*=": 1,
    "||": 1
}

def keep_words(tokens, keep_tokens):
    for word in list(tokens):
        if word not in keep_tokens:
            tokens.remove(word)
    return tokens

Result = []
def getResults(fileName):
    myfile1 = open('file.txt', 'r')
    myfile2 = open('database/'+fileName, 'r')
    file1 = open('B1.cpp','w')
    file2 = open('B2.cpp','w')

    for line in myfile1.readlines():
        if not (line.startswith('//')):
            file1.write(line)
 
    for line in myfile2.readlines():
        if not (line.startswith('//')):
            file2.write(line)

    file2.close()
    file1.close()

    finalfile1 = open("B1.cpp",'r')
    contents1 = finalfile1.read()       
    finalfile1.close()
    inp = contents1

    finalfile2 = open("B2.cpp",'r')
    contents2 = finalfile2.read()       
    finalfile2.close()   
    inp2 = contents2

    tokens = nltk.word_tokenize(inp)
    tokens2 = nltk.word_tokenize(inp2)

    for i in range(len(tokens)):
        if tokens[i] == 'if':
            tokens[i] = 'conditional'
        if tokens[i] == 'else':
            tokens[i] = 'conditional'
        if(tokens[i]=="for"):
            tokens[i]="Loop"
        if(tokens[i]=="while"):
            tokens[i]="Loop"
    
    for i in range(len(tokens2)):
        if tokens2[i] == 'if':
            tokens2[i] = 'conditional'
        if tokens2[i] == 'else':
            tokens2[i] = 'conditional'
        if(tokens2[i]=="for"):
            tokens2[i]="Loop"
        if(tokens2[i]=="while"):
            tokens2[i]="Loop"

    keep_words(tokens, keep_tokens)
    keep_words(tokens2, keep_tokens)
    sm=difflib.SequenceMatcher(None,tokens,tokens2)
    finalans=sm.ratio()*100
    finalans=round(finalans,2)
    Result.append((fileName, finalans))
    # print(fileName, finalans,Result)

def loopAllFiles():
    for file in os.listdir(os.getcwd()+'/database'):
        getResults(file)

################################################################
@app.route('/result', methods=['GET', 'POST'])
def all():
    Result = []
    loopAllFiles()
    print(Result)
    return jsonify({'res': Result, 'status': True})

@app.route("/upload", methods=["POST"])
def upload_file():
  if request.method == 'POST':
      global Result
      f = request.files['file']
      print(f)
      f.save(secure_filename('file.txt'))
      Result = []
      loopAllFiles()
      print(Result)
      return jsonify({'res': Result, 'status': True})
  return jsonify({'res': 'Failed To Upload', 'status': False})

@app.route('/code', methods=['GET', 'POST'])
def code():
    global Result
    data = request.data.decode('utf-8')
    codeData = json.loads(data)['code']
    print(codeData)
    if codeData != '':
        file = open('file.txt','w')
        file.write(codeData)
        file.close()
        Result = []
        loopAllFiles()
        print(Result)
        return jsonify({'res': Result, 'status': True})
    return jsonify({"sucess": False, 'message': "fail"})

@app.route('/', methods=['GET', 'POST'])
def display():
    return "welcome to detecto"

@app.route('/github', methods=["POST", "GET"])
def Github():
    data = request.data.decode('utf-8')
    repo = json.loads(data)['repo']
    print(repo)
    if repo != '':
        gitext.search(repo)
        return jsonify({"sucess": True, 'message': "done"})
    return jsonify({"sucess": False, 'message': "fail"})

if __name__ == '__main__':
    app.run(port=8000,debug=True)