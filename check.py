import nltk
import difflib
import os
nltk.download('punkt')

keep_tokens = {
    "[":1,
    "]":1,
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


def getResults(fileName, tokens, Result):
    myfile2 = open(fileName, 'r')
    file2 = open('testFile2.cpp','w')

    # removing comments
    for line in myfile2.readlines():
        if not (line.startswith('//')):
            file2.write(line)

    file2.close()
    myfile2.close()

    finalfile2 = open("testFile2.cpp",'r')
    contents2 = finalfile2.read()       
    finalfile2.close()   
    inp2 = contents2

    tokens2 = nltk.word_tokenize(inp2)
    
    for i in range(len(tokens2)):
        if tokens2[i] == 'if':
            tokens2[i] = 'conditional'
        if tokens2[i] == 'else':
            tokens2[i] = 'conditional'
        if(tokens2[i]=="for"):
            tokens2[i]="Loop"
        if(tokens2[i]=="while"):
            tokens2[i]="Loop"

    keep_words(tokens2, keep_tokens)
    sm=difflib.SequenceMatcher(None,tokens,tokens2)
    finalans=sm.ratio()*100
    finalans=round(finalans,2)
    num=len(os.getcwd())
    print(os.getcwd())
    if finalans!=0 or finalans!=0.0:
        Result.append((fileName[num+10:], finalans))

def loopAllFiles(Result):
    myfile1 = open('file.txt', 'r')
    file1 = open('testFile1.cpp','w')
    
    # removing comments
    for line in myfile1.readlines():
        if not (line.startswith('//')):
            file1.write(line)

    file1.close()
    myfile1.close()

    finalfile1 = open("testFile1.cpp",'r')
    contents1 = finalfile1.read()       
    finalfile1.close()
    inp = contents1
    tokens = nltk.word_tokenize(inp)

    for i in range(len(tokens)):
        if tokens[i] == 'if':
            tokens[i] = 'conditional'
        if tokens[i] == 'else':
            tokens[i] = 'conditional'
        if(tokens[i]=="for"):
            tokens[i]="Loop"
        if(tokens[i]=="while"):
            tokens[i]="Loop"
    keep_words(tokens, keep_tokens)

    contents=list(os.scandir(os.getcwd()+'/database'))
    while contents:
        file_content = contents.pop()
        if file_content.is_dir():
            # print(file_content.path)
            contents.extend(os.scandir(file_content.path))
        else:
            # print(file_content.path,file_content.name)
            getResults(file_content.path, tokens, Result) 
    Result.sort(key=lambda x:x[1],reverse=True)  
    print(Result)

# Result=[]
# loopAllFiles(Result)
# print(Result)