import nltk
import difflib
import os
nltk.download('punkt')

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


def getResults(fileName, Result):
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

def loopAllFiles(Result):
    for file in os.listdir(os.getcwd()+'/database'):
        # print(file)
        getResults(file, Result)
