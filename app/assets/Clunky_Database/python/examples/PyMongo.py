import pymongo
import sys

# establish a connection to the server, and use it to get a handle on the scores collection.
connection = pymongo.MongoClient("mongodb://localhost")

# get a handle to the school database and the scores collection.
db = connection.school
scores = db.scores

try:
        doc = scores.find_one()

except Exception as e:
        print "Unexpected error:", type(e), e

print doc