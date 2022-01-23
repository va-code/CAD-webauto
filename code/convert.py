import trimesh
import os
  
# Folder Path
path = os.getcwd()
#path = path+'/testfolder'
os.chdir(path)
# Read text File

def convert(file_path, name):
	mesh = trimesh.load(file_path)
	glb = trimesh.exchange.gltf.export_glb(mesh)
	new_name = name +'.glb'

	file = open(new_name,'wb')

	file.write(glb)
	file.close()

convert('/home/vaughn/test/Dragon 2.5_stl.stl',"Dragon 2.5")
'''
# iterate through all file
for file in os.listdir():
	# Check whether file is in text format or not
	if file.endswith(".stl"):

		file_path = f"{path}\{file}"
		file_name = os.path.splitext(file_path)
		# call read text file function
		convert(file_path,file_name[0])
'''
