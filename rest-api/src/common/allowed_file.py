ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def get_extension(filename):
    return filename.rsplit('.', 1)[1].lower()

def allowed_file(filename):
    return '.' in filename and \
           get_extension(filename) in ALLOWED_EXTENSIONS