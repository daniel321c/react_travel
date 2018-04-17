from pymongo import MongoClient
import pprint
from CountryTourismModel import Country, Arrival
from mongoengine import connect
import csv
import math

def MakeCountry(data):
    country = Country(
        countryName=data['Country Name'],
        countryCode=data['Country Code'],
        indicatorName=data['Indicator Name'],
        indicatorCode=data['Indicator Code']
    )
    start = 1960
    end = 2017
    while start <= end:
        index = str(start)
        if data[index] == '':
            arrival = Arrival(year=start, arrival=0)
        else:
            arrival = Arrival(year=start, arrival=math.ceil(float(data[index])))
        country.tourismArrival.append(arrival);
        start += 1
    return country

connect(
    db='react_database',
    username='root',
    password='root',
    host='mongodb://ds111648.mlab.com:11648'
)

# country = Country(
#     countryName='Aruba'
# )
#
# country.save()

with open('C:\\Users\\Jichen\\Documents\\reactApp\\1995 - 2017 Tourism Arrival Data.csv', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f, delimiter=',')
    for row in reader:
        country = MakeCountry(row)
        country.save()



