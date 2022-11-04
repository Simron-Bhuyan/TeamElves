import mosspy
import os
userid = 444017458


m = mosspy.Moss(userid, "python")

def hey():
    # m.addBaseFile("test.py")

    # Submission Files
    m.addFile("main/test.py")
    m.addFile("main/test2.py")

    # progress function optional, run on every file uploaded
    # result is submission URL
    url = m.send(lambda file_path, display_name: print(display_name, end='', flush=True))
    print()

    print ("Report Url: " + url)

    # Save report file
    m.saveWebPage(url, "report.html")

    # Download whole report locally including code diff links
    mosspy.download_report(url, "submission/report/", connections=8, log_level=10, on_read=lambda url: print('*', end='',   flush=True)) 
    # log_level=logging.DEBUG (20 to disable)
    # on_read function run for every downloaded file
    return url

hey()