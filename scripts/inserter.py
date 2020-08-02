import mysql.connector
import pandas as pd

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="dbspass1234",
  database="ratemate"
)
mycursor = mydb.cursor()

data = pd.read_csv('./sections.csv')

for index, row in data.iterrows():
    search_q = "INSERT INTO section VALUES('" + str(row['Subject']) + "'," + str(row['Course']) + "," + str(row['CRN']) + ",'" + str(row['Course Title']) + "','" + str(row['Sched Type']) + "'," + str(row['A+']) + "," + str(row['A']) + "," + str(row['A-']) + "," + str(row['B+']) + "," + str(row['B']) + "," + str(row['B-']) + "," + str(row['C+']) + "," + str(row['C']) + "," + str(row['C-']) + "," + str(row['D+']) + "," + str(row['D']) + "," + str(row['D-']) + "," + str(row['F']) + "," + str(row['W']) + "," + str(row['Average Grade']) + ",'" + str(row['Primary Instructor']) + "')"
    print(search_q)
    mycursor.execute(search_q)

mydb.commit()
mydb.close()