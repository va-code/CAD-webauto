import trimesh
import os
import shutil
# Python script folder Path
path = os.getcwd()
#path = path+'/testfolder'
os.chdir(path)
# shutil module offers an easy way to handle moving and duplicating files to a new directory
# shutil.copytree(src, dst)
clonefolder = '/gitclone'
cloneglbfolder = '/test'

src = path + clonefolder
dst = path + cloneglbfolder
os.remove(dst)
#shutil.copytree(src, dst)
print('creating folder done')

def convert(file_path, name):
	mesh = trimesh.load(file_path)
	glb = trimesh.exchange.gltf.export_glb(mesh)
	new_name = name +'.glb'

	file = open(new_name,'wb')

	file.write(glb)
	file.close()

#convert('/home/vaughn/test/Dragon 2.5_stl.stl',"Dragon 2.5")
# iterate through all file
def folder_toglb():
    for file in os.listdir():
        # Check whether file is in text format or not
        if file.endswith(".stl"):

            file_path = f"{path}\{file}"
            file_name = os.path.splitext(file_path)
            # call read text file function
            convert(file_path,file_name[0])
