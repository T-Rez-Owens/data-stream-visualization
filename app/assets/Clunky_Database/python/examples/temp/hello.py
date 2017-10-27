import bottle
import pymongo

# this is the handler for the default path of the web server

@bottle.route('/')
def index():

    #connect to mongoDB
    connection = pymongo.MongoClient('localhost', 27017)

    #attach to test database
    db = connection.test

    # get handle for names collection
    name = db.names

    #find a single document
    item = name.find_one()

    mythings = ['apple','orange','banana','etc']

    #return bottle.template('hello', username=item['name'],things=mythings)
    return bottle.template('hello',{'username':item['name'],'things':mythings})#same as above line

@bottle.post('/favorite_fruit')
def favorite_fruit():
    fruit = bottle.request.forms.get("fruit")
    if (fruit == None or fruit == ""):
        fruit = "No fruit Selected"
    bottle.response.set_cookie("fruit",fruit)
    bottle.redirect("/show_fruit")    

@bottle.route('/show_fruit')
def show_fruit():
    fruit = bottle.request.get_cookie("fruit")

    return bottle.template('fruit',{"fruit":fruit})


bottle.debug(True)
bottle.run(host='localhost', port=8080)
