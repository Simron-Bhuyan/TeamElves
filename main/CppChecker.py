import difflib 
import nltk
import jellyfish
import os, re
# from spacy.tokenizer import Tokenizer
# from spacy.lang.en import English
# nlp = English()


nltk.download('punkt')

myfile1 = open("6-3.cpp",'r')
contents1 = myfile1.read()       
myfile1.close()
inp = contents1

myfile2 = open("6-3.cpp",'r')
contents2 = myfile2.read()       
myfile2.close()   
inp2 = contents2

# inp = """
# include <bits/stdc++.h>
# using namespace std;

# int main(){
#     int a,b;
#     cin>>a>>b;
#     cout<<a+b<<"\n";
# }
# """
# inp2 = """
# include <bits/stdc++.h>
# using namespace std;
# int sum10(int z ,int y)
# {
#     int s=z+y;
#     return s;
# }
# int main(){
#     int a,b;
#     cin>>a>>b;
#     cout<<add(a,b)<<"\n";
# } 
# """
# Tokenization
# tokenizer = Tokenizer(nlp.vocab)
# tokens = tokenizer("Hey Good morning! Let's go to school")

tokens = nltk.word_tokenize(inp)
print(tokens)

print("Tokens for Input File 1:")
print(tokens)


keep_tokens = [
     "Auto",
    "double",
    "int",
    "struct",
    "Break",
    "else",
    "long",
    "switch",
    "Case",
    "enum",
    "register",
    "typedef",
    "Char",
    "extern",
    "return",
    "union",
    "Const",
    "float",
    "short",
    "unsigned",
    "Continue",
    "signed",
    "void",
    "Default",
    "goto",
    "sizeof",
    "volatile",
    "if",
    "static",
    "Asm",
    "dynamic_cast",
    "namespace",
    "reinterpret_cast",
    "Bool",
    "explicit",
    "new",
    "static_cast",
    "Catch false",
    "operator",
    "template",
    "Class",
    "friend",
    "private",
    "this",
    "Const_cast",
    "inline",
    "public",
    "throw",
    "Delete",
    "mutable",
    "protected",
    "true",
    "Try",
    "typeid",
    "typename",
    "using",
    "virtual",
    "wchar_t",
    "cin",
    "cout",
    "#include",
    "<iostream>",
    "main()",
    ";",
    "std",
    "<<",
    ">>",
    "_",
    "{",
    "}",
    "[",
    "]",
    "#",
    "(",
    ")",
    "<",
    ">",
    "%",
    ":",
    ";",
    ".",
    "?",
    "*",
    "+",
    "-",
    "/",
    "^",
    "&",
    "|",
    "~",
    "!",
    "=",
]

def keep_words(tokens, keep_tokens):
    for word in list(tokens):
        if word not in keep_tokens:
            tokens.remove(word)
    return tokens

keep_words(tokens, keep_tokens)

str1=""
str1=str1.join(tokens)
print('----------------------------------------------------------------------------------------------------------------')
print(str1)

tokens_2 = nltk.word_tokenize(inp2)

# def remove_words(tokens_2, remove_tokens):
#     for word in list(tokens_2):
#         if word not in remove_tokens:
#             tokens_2.remove(word)
#     return tokens_2

def keep_words2(tokens_2, keep_tokens):
    for word2 in list(tokens_2):
        if word2 not in keep_tokens:
            tokens_2.remove(word2)
    return tokens_2

keep_words2(tokens_2, keep_tokens)

# print("Tokens for Input File 2:")
# print(tokens_2)

str2=""
str2=str2.join(tokens_2)
print('----------------------------------------------------------------------------------------------------------------')
print(str2)

print(jellyfish.jaro_distance(str1, str2))

sm=difflib.SequenceMatcher(None,tokens,tokens_2)
print (sm.ratio()*100)
