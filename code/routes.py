import os
  
# Folder Path
path = os.getcwd()
cloneglbfolder = '/gitclone-glb'
path = path+cloneglbfolder
os.chdir(path)

title = '"title":"Getting Closer!",'

def Routes_routes():
    folders = []
    filesin = []
    routesjson = '"Routes": {"404": "/404.html", \n'
    for root, dirs, files in os.walk(".", topdown= True):
        filesin.append( files)
        for name in dirs:
            temp = os.path.join(root, name)
            folders.append(temp[1:])
    filesin.pop(0)
    filesin.pop(0)
    folders.pop(0)           
    for i in range(len(filesin)):
        for j in range(len(filesin[i])):
            if not filesin[i][j].endswith(".txt"):
                filesin[i][j] = ''
        filesin[i].sort(reverse=True)
        filesin[i] = filesin[i][0]
        
    #testing for formatting
    for i in range(len(folders)):
        routesjson = routesjson + '"/' + folders[i][1:] + '":"' +cloneglbfolder+ '/' + folders[i][1:] +'/' + filesin[i] + '",\n'
    routesjson = routesjson[:(len(routesjson)-2)] + '},'
    return routesjson
 
def glb_routes():
    folders = []
    filesin = []
    glbs_path = []
    glbjson='"glb":{"404": "ERROR-no-GLB-files-found-for-route ",'
    for root, dirs, files in os.walk(".", topdown= True):
        filesin.append( files)
        for name in dirs:
            temp = os.path.join(root, name)
            folders.append('"/' + temp[2:] + '"')
    filesin.pop(0)
    filesin.pop(0)
    folders.pop(0)
    
    for i in range(len(filesin)):
        for j in range(len(filesin[i])):
            if not filesin[i][j].endswith(".glb"):
                filesin[i][j] = ''
            else:
                filesin[i][j] = cloneglbfolder + folders[i][1:(len(folders[i])-1)] +'/' + filesin[i][j]
        filesin[i] = ' '.join(filesin[i])
    for i in range(len(folders)):
        glbjson = glbjson + '\n' + folders[i] +':"' + filesin[i] + '",'
    len(glbjson)
    glbjson = glbjson[:(len(glbjson)-1)]
    glbjson = glbjson + '}'
    return glbjson

def href_routes():
    folders = []
    hrefjson = '''"hrefs":"<a href='/' onclick='route()'>Home</a> '''
    for root, dirs, files in os.walk(".", topdown= True):
        for name in dirs:
            temp = os.path.join(root, name)
            folders.append(temp[1:])
    
    folders.pop(0)
    for i in range(len(folders)):
        hrefjson = hrefjson + "<a href='/" + folders[i][1:] + "' onclick='route()'>"+folders[i][1:]+"</a> "
    hrefjson = hrefjson + '",'
    return hrefjson

# Read text File
def savejson(name, output):
    new_name = name +'.json'
    file = open(new_name,'wt')
    file.write(output)
    file.close()

savejson('Routes','{' + title +'\n'+ href_routes() +'\n'+ Routes_routes() +'\n'+ glb_routes() + '}')