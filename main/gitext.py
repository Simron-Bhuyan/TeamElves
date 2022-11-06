from github import Github
from base64 import b64decode
import os

g = Github("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")
ext=['html','py','cpp','c','jsx','css','js']

reponame=("DivyeNegi/spotify-clone")

def search(reponame):
    repo = g.get_repo(reponame)
    contents = repo.get_contents("")
    while contents:
        file_content = contents.pop(0)
        if file_content.type == "dir":
            contents.extend(repo.get_contents(file_content.path))
        else:
            # file_content.save(file_content.name, content, save=True)
            # print(os.path.splitext(file_content.name)[1])
            if os.path.splitext(file_content.name)[1][1:] in ext:
                file=open('database/'+file_content.name,'ab')
                file.write(b64decode(file_content.content))
                file.close() 
                print(file_content.name+' done')

search(reponame)