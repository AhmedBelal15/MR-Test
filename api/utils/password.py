import bcrypt
     
def hash_password(password):
    bstring = password.encode('UTF-8')
    return bcrypt.hashpw(bstring, bcrypt.gensalt())
     