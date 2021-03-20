import datetime

START_DATE = datetime.datetime(2020, 1, 1)


def getPlateOrdersBasedOnDay(dayIndex):
    createTimeObject(dayIndex)


def createTimeObject(day):
    def getOpeningTime(dayName):
        if dayName in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]:
            print("Normal Day Week")
            return (datetime.timedelta(hours=9) + datetime.timedelta(minutes=30))
        else:
            print("Special day")
            return (datetime.timedelta(hours=12))

    def getClosingTime(dayName):
        if dayName in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]:
            print("Normal Day Week")
            return (datetime.timedelta(hours=21) + datetime.timedelta(minutes=30))
        else:
            print("Special day")
            return (datetime.timedelta(hours=5))
    # Date Object begins at 12 am
    day = START_DATE + datetime.timedelta(days=day)
    dayOfWeekName = day.strftime("%A")
    openingTimeRestaurant = day + getOpeningTime(dayOfWeekName)
    closingTimeRestaurant = day + getClosingTime(dayOfWeekName)
