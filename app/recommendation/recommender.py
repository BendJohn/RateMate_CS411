import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse

#------------------
# LOAD THE DATASET
#------------------

data = pd.read_csv('../data/courses.csv')

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
known_user_likes = known_user_likes[known_user_likes >0].index.values

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

print(known_user_likes)
print(score.nlargest(20))