import io
from base64 import encodebytes
from PIL import Image

def get_image(image_path):
   img = Image.open(image_path, mode='r')
   byte_arr = io.BytesIO()
   img.save(byte_arr, format='PNG') 
   encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii')
   return encoded_img