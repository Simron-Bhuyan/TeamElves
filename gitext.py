from github import Github
from base64 import b64decode
import os
from pathlib import Path

g = Github("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")
ext=['cpp']

def search(reponame):
    temp=reponame.split('/')
    paths=Path(os.getcwd()+'/database/')
    paths.mkdir(exist_ok=True)
    paths=Path(os.getcwd()+'/database/'+temp[0])
    paths.mkdir(exist_ok=True)
    paths=Path(os.getcwd()+'/database/'+reponame)
    paths.mkdir(exist_ok=True)
    # os.mkdir(os.getcwd()+'/database/'+temp[0])
    # os.mkdir(os.getcwd()+'/database/'+reponame)
    repo = g.get_repo(reponame)
    contents = repo.get_contents("")
    while contents:
        file_content = contents.pop(0)
        if file_content.type == "dir":
            contents.extend(repo.get_contents(file_content.path))
        else:
            # file_content.save(file_content.name, content, save=True)
            print(os.path.splitext(file_content.name)[1])
            if os.path.splitext(file_content.name)[1][1:] in ext:
                file=open('database/'+reponame+'/'+file_content.name,'ab')
                file.write(b64decode(file_content.content))
                file.close() 
                print(file_content.name+' done')
