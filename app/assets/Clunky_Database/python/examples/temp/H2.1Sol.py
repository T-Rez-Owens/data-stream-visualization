#!/usr/bin/env python
import pymongo

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")

# get a handle to the students database
db = connection.students
grades = db.grades


def find():

    print "find, reporting for duty"

    query = {'student_id':{'$gte':0},'type': 'homework', }

    try:
        cursor = grades.find(query)
        cursor.sort([('student_id', pymongo.ASCENDING),('score', pymongo.ASCENDING)])
    except Exception as e:
        print "Unexpected error:", type(e), e

    studentID=-1
    for doc in cursor:
        print ("" + str(int(doc['student_id'])) + " " + str(int(doc['score'])))
        if studentID == int(doc['student_id']):
            print "skipped" #do Nothing
        else:
            studentID = int(doc['student_id'])
            grades.delete_one({'_id':doc['_id']})
        
    




if __name__ == '__main__':
    find()
