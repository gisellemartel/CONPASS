import xml.dom.minidom
import re

#First add SVG current python directory or update path :)

#Replace myFile with your finished SVG
with open('myFile.svg', 'a') as f:
    doc = xml.dom.minidom.parse('myFile.svg')
    name = doc.getElementsByTagName('text')
    for t in name:
        matcher = re.findall("svg...*", t.attributes['id'].value)
        if (matcher):
            for x in t.childNodes:
                updatedID = str(x.nodeValue)
                t.attributes['id'].value = updatedID
                #Enter newFile name
                updatedFile = 'newTesterFile2.svg'
                f = open(updatedFile, 'w')
                doc.writexml(f)
                f.close()
