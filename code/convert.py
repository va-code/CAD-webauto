import trimesh
import os
import shutil
# Python script folder Path
path = os.getcwd()
#path = path+'/testfolder'
os.chdir(path)
# shutil module offers an easy way to handle moving and duplicating files to a new directory
# shutil.copytree(src, dst)
clonefolder = '\\gitclone'
cloneglbfolder = '\\gitclone-glb'

src = path + clonefolder
dst = path + cloneglbfolder
#need to figure conditionally deleting the dst folder for when doing a gitpull
if os.path.isdir(dst) == True:
    shutil.rmtree(dst)
    print('dst removed')
    shutil.copytree(src, dst)
    print('dst folder copied')
else:
    shutil.copytree(src, dst)
    print('dst folder copied')
    

def convert(file_path):
	mesh = trimesh.load(file_path)
	glb = trimesh.exchange.gltf.export_glb(mesh)
	new_name = file_path[:((len(file_path))-4)] + '.glb'

	file = open(new_name,'wb')

	file.write(glb)
	file.close()

# iterate through all file
def folder_toglb(dst):
    for folder in os.listdir(dst):
        for file in os.listdir(dst+'//'+folder):
            # Check whether file is in text format or not
            if file.endswith(".stl"):
                filepath = dst+'\\'+ folder +'\\'+file
                # call read text file function
                convert(filepath)
                
        for file in os.listdir(dst+'//'+folder):
            if file.endswith(".stl"):
                filepath = dst+'\\'+ folder +'\\'+file
                os.remove(filepath)
                
            
folder_toglb(dst)

def generate_home(dst):
    hometxt = 'Home.txt'
    os.mkdir(dst+'\\'+'Home')
    sources = []
    Homepath = dst + '\\' + "Home"
    for folder in os.listdir(dst):
        for file in os.listdir(dst+'//'+folder):
            if file.endswith(".glb")  & (file == os.listdir(dst+'//'+folder)[0]):
                sources.append([dst+'\\'+folder+'\\'+file,Homepath+'\\'+file])
    for filepath in sources:
    #change so that homepath is the comcplete new filepath.
        shutil.copyfile(filepath[0], filepath[1])
    shutil.copyfile(os.getcwd()+'\\'+hometxt, Homepath+'\\'+hometxt)
    print('home folder generated')      
generate_home(dst) 
