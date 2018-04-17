from mongoengine import *


class Arrival (EmbeddedDocument):
    year = IntField()
    arrival = IntField()


class Country (Document):
    countryName = StringField()
    countryCode = StringField()
    indicatorName = StringField()
    indicatorCode = StringField()
    tourismArrival = ListField(EmbeddedDocumentField(Arrival))



