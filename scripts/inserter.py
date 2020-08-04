import mysql.connector
import pandas as pd
import numpy as np

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
    if row["Subject"] != "CS":
        continue

    if row["Sched Type"] == "ONL" or row["Sched Type"] == "DIS":
        continue
    search_q = "INSERT INTO section VALUES('" + str(row['Subject']) + "'," + str(row['Course']) + "," + str(row['CRN']) + ",'" + str(row['Course Title']) + "','" + str(row['Sched Type']) + "'," + str(row['A+']) + "," + str(row['A']) + "," + str(row['A-']) + "," + str(row['B+']) + "," + str(row['B']) + "," + str(row['B-']) + "," + str(row['C+']) + "," + str(row['C']) + "," + str(row['C-']) + "," + str(row['D+']) + "," + str(row['D']) + "," + str(row['D-']) + "," + str(row['F']) + "," + str(row['W']) + "," + str(row['Average Grade']) + ",'" + str(row['Primary Instructor']) + "')"
    print(search_q)
    mycursor.execute(search_q)

# for index, row in professorData.iterrows():
#     avg_rating = round(row['avg_rating'] * 10) / 10
#     search_q = "INSERT INTO professor VALUES('" + str(row['firstname']) + "', '" + str(row['lastname']) + "'," + str(avg_rating) + ")"
#     print(search_q)
#     mycursor.execute(search_q)

for index, row in courseData.iterrows():
    if row["Subject"] != "CS" or row["Number"] > 300:
        continue

    if row["Schedule_Information"] is np.nan:
        row["Schedule_Information"] = ""
    if row["Degree_Attributes"] is np.nan:
        row["Degree_Attributes"] = ""
    if row["Section_Info"] is np.nan:
        row["Section_Info"] = ""
    if row["Description"] is np.nan:
        row["Description"] = ""
    if row["Subject"] is np.nan:
        row["Subject"] = ""
    if row["Name"] is np.nan:
        row["Name"] = ""
    if row["Credit_Hours"] is np.nan:
        row["Credit_Hours"] = ""

    if len(row["Description"]) > 599:
        continue
    if len(str(row["Schedule_Information"])) > 254:
        continue
    if len(str(row["Section_Info"])) > 254:
        continue

    search_q = "INSERT INTO course VALUES('" + str(row['Subject']) + "'," + str(row['Number']) + ", '" + str(row['Name']) + "', '" + str(row['Description']) + "', '" + str(row['Credit_Hours']) + "', '" + str(row['Section_Info']) + "', '" + str(row['Degree_Attributes']) + "', '" + str(row['Schedule_Information']) + "')"
    print(search_q)

    mycursor.execute(search_q)

mydb.commit()
mydb.close()