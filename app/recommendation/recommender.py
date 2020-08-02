import sys
import mysql.connector

import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse

#--------------------
# Prerequisite Graph
#--------------------

def prerequisite(netid, standing, department, user_courses):
    data = pd.read_csv('./app/data/prerequisites.csv')
    data_dept = data[data.Course.str.startswith(department + ' ')]

    # Add all CS prerequisite courses
    for uCourse in user_courses:
        uCourse_prereqs = data_dept.loc[data_dept['Course'] == uCourse]
        num_prereqs = uCourse_prereqs.iloc[0]['PrerequisiteNumber']
        for i in range(num_prereqs):
            prereq = uCourse_prereqs.iloc[0][str(i)]
            if prereq.startswith(department + ' ') and prereq not in user_courses:
                user_courses.append(prereq)

    # Go through all department courses and check whether user can take them
    recCourses = []
    for index, row in data_dept.iterrows():
        cur_course = row['Course']
        if (cur_course in user_courses):
            continue

        num_prereqs = row['PrerequisiteNumber']
        add = True
        for i in range(num_prereqs):
            prereq = row[str(i)]
            if prereq.startswith(department + ' ') and prereq not in user_courses:
                add = False
                break
        if add:
            recCourses.append(cur_course)

    # 

#----------------------------------
# Nearest Neighbors Recommendation
#----------------------------------

def nearestNeighbors(netid, standing, department, user_courses):
    data = pd.read_csv('./app/data/courses.csv')

    # Create a new dataframe without the user ids.
    data_items = data.drop('user', 1)

    #------------------------
    # ITEM-ITEM CALCULATIONS
    #------------------------

    # As a first step we normalize the user vectors to unit vectors.

    # magnitude = sqrt(x2 + y2 + z2 + ...)
    magnitude = np.sqrt(np.square(data_items).sum(axis=1))

    # unitvector = (x / magnitude, y / magnitude, z / magnitude, ...)
    data_items = data_items.divide(magnitude, axis='index')

    def calculate_similarity(data_items):
        """Calculate the column-wise cosine similarity for a sparse
        matrix. Return a new dataframe matrix with similarities.
        """
        data_sparse = sparse.csr_matrix(data_items)
        similarities = cosine_similarity(data_sparse.transpose())
        sim = pd.DataFrame(data=similarities, index= data_items.columns, columns= data_items.columns)
        return sim

    # Build the similarity matrix
    data_matrix = calculate_similarity(data_items)

    # Lets get the top 11 similar artists for Beyonce
    # print(data_matrix.loc['beyonce'].nlargest(11))

    #---------------------------
    # USER-ITEM CALCULATIONS V1
    #---------------------------

    # user = 5985 # The id of the user for whom we want to generate recommendations
    # user_index = data[data.user == user].index.tolist()[0] # Get the frame index

    # # Get the artists the user has likd.
    # known_user_likes = data_items.ix[user_index]
    # known_user_likes = known_user_likes[known_user_likes >0].index.values

    # # Users likes for all items as a sparse vector.
    # user_rating_vector = data_items.ix[user_index]

    # # Calculate the score.
    # score = data_matrix.dot(user_rating_vector).div(data_matrix.sum(axis=1))

    # # Remove the known likes from the recommendation.
    # score = score.drop(known_user_likes)

    # # Print the known likes and the top 20 recommendations.
    # print(known_user_likes)
    # print(score.nlargest(20))

    #---------------------------
    # USER-ITEM CALCULATIONS V2
    #---------------------------

    # Construct a new dataframe with the 10 closest neighbors (most similar)
    # for each artist.
    data_neighbors = pd.DataFrame(index=data_matrix.columns, columns=range(1,11))
    for i in range(0, len(data_matrix.columns)):
        data_neighbors.iloc[i,:10] = data_matrix.iloc[0:,i].sort_values(ascending=False)[:10].index

    user = 5985
    user_index = data[data.user == user].index.tolist()[0]

    # Get the artists the user has played.
    known_user_likes = data_items.iloc[user_index]
    known_user_likes = known_user_likes[known_user_likes > 0].index.values

    # Construct the neighborhood from the most similar items to the
    # ones our user has already liked.
    most_similar_to_likes = data_neighbors.loc[known_user_likes]
    similar_list = most_similar_to_likes.values.tolist()
    similar_list = list(set([item for sublist in similar_list for item in sublist]))
    neighborhood = data_matrix[similar_list].loc[similar_list]

    # A user vector containing only the neighborhood items and
    # the known user likes.
    user_vector = data_items.iloc[user_index].loc[similar_list]

    # Calculate the score.
    score = neighborhood.dot(user_vector).div(neighborhood.sum(axis=1))

    # Drop the known likes.
    score = score.drop(known_user_likes)

    # print(known_user_likes)
    score = score.nlargest(20).to_frame().index
    print(list(score))


#--------------------
# Choose Recommender
#--------------------

netid = sys.argv[1]

# Run SQL query to find out how many unique users there are\import mysql.connector
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="dbspass1234",
  database="ratemate"
)

# How many users are there?
mycursor = mydb.cursor()
mycursor.execute("SELECT count(*) FROM user")
users = mycursor.fetchall()

# Get the department and standing of the user
mycursor.execute("SELECT standing, department FROM user WHERE netid='" + netid + "'")
tmp = mycursor.fetchall()
standing = tmp[0][0]
department = tmp[0][1]

# Get all courses the user has taken
mycursor.execute("SELECT CONCAT(s.subject, ' ', s.number) as course FROM enrollments e NATURAL JOIN section s WHERE netid='" + netid + "'")
courses = mycursor.fetchall()
courses = [elem[0] for elem in courses]

if users[0][0] < 100:
    prerequisite(netid, standing, department, courses)
else:
    nearestNeighbors(netid, standing, department, courses)