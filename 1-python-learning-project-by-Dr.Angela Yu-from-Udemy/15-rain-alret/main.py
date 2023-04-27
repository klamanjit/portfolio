import requests
import os
from twilio.rest import Client

api_key = "0c6d0b447c5659d6e58bba134e56391c"
LAT = 13.756331
LONG = 100.501762
OME_Endpoint = "https://api.openweathermap.org/data/2.5/weather"
account_sid = "ACd3919f15304d21d91d33e378c7fde36b"
auth_token = "549da55f816dcd33582507e34e7eb9f2"

parameters = {
    "lat": LAT,
    "lon": LONG,
    "appid": api_key
}


response = requests.get(OME_Endpoint, params=parameters)
response.raise_for_status()
weather_data = response.json()


weather_condition = weather_data["weather"][0]["id"]
if int(weather_condition) < 700:
    ## Send sms part
    client = Client(account_sid, auth_token)
    message = client.messages \
        .create(
        body="Bring an umbrella.",
        from_='+12763859922', ## phone from twilio
        to='+15558675310'## your phon that regis with twilio
    )

    print(message.status)

else:
    ## Send sms part
    client = Client(account_sid, auth_token)
    message = client.messages \
        .create(
        body="It's a nice day.",
        from_="+12763859922",  ## phone from twilio
        to="+66633432801"  ## your phon that regis with twilio
    )

    print(message.status)












