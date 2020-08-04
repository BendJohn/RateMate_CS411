import mysql.connector
import pandas as pd

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="dbspass1234",
  database="ratemate"
)
mycursor = mydb.cursor()

sectionData = pd.read_csv('./fa2019.csv')
professorData = pd.read_csv('./professor.csv')
courseData = pd.read_csv('./uiuc-course-catalog.csv')
print("hello world")

for index, row in sectionData.iterrows():
    search_q = "INSERT INTO section VALUES('" + str(row['Subject']) + "'," + str(row['Course']) + "," + str(row['CRN']) + ",'" + str(row['Course Title']) + "','" + str(row['Sched Type']) + "'," + str(row['A+']) + "," + str(row['A']) + "," + str(row['A-']) + "," + str(row['B+']) + "," + str(row['B']) + "," + str(row['B-']) + "," + str(row['C+']) + "," + str(row['C']) + "," + str(row['C-']) + "," + str(row['D+']) + "," + str(row['D']) + "," + str(row['D-']) + "," + str(row['F']) + "," + str(row['W']) + "," + str(row['Average Grade']) + ",'" + str(row['Primary Instructor']) + "')"
    print(search_q)
    mycursor.execute(search_q)

for index, row in professorData.iterrows():
    search_q = "INSERT INTO professor VALUES('" + str(row['firstname']) + "'," + str(row['lastname']) + "'," + str(row['avg_rating']) + "')"
    print(search_q)
    mycursor.execute(search_q)

for index, row in courseData.iterrows():
    search_q = "INSERT INTO course VALUES('" + str(row['Year']) + "'," + str(row['Term']) + "," + str(row['YearTerm']) + ",'" + str(row['Subject']) + "','" + str(row['Number']) + "'," + str(row['Name']) + "," + str(row['Description']) + "," + str(row['Credit_Hours']) + "," + str(row['Section_Info']) + "," + str(row['Degree_Attributes']) + "," + str(row['Schedule_Information']) + "')"
    print(search_q)
    mycursor.execute(search_q)

mydb.commit()
mydb.close()