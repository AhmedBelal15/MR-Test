import bcrypt
     
def hash_password(password):
    bstring = password.encode('UTF-8')
    return bcrypt.hashpw(bstring, bcrypt.gensalt())

def compare_passwords(password, hashed_password):
    bstring = password.encode("UTF-8")
    return bcrypt.checkpw(bstring, hashed_password)