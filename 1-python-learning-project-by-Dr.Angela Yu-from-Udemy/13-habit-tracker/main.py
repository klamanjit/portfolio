import requests
from datetime import datetime

USERNAME = "wasit"
TOKEN = "asdjdskdkwsadwa"

### Create User

pixela_endpoint = "https://pixe.la/v1/users"

user_parameters = {
    "token": TOKEN,
    "username": USERNAME,
    "agreeTermsOfService": "yes",
    "notMinor": "yes"

}

# response = requests.post(url=pixela_endpoint, json=user_parameters)
# print((response.text))

### Create graph

graph_endpoint = f"{pixela_endpoint}/{USERNAME}/graphs"

graph_id = "kla2801"
graph_config = {
    "id": graph_id,
    "name": "Coding Tracker",
    "unit": "minute",
    "type": "float",
    "color": "kuro"
}

headers = {
    "X-USER-TOKEN": TOKEN
}

# response = requests.post(url=graph_endpoint, json=graph_config, headers=headers)
# print(response.text)

### Post pixel

post_value_endpoint = f"{graph_endpoint}/{graph_id}"

today_date = datetime(year=2023, month=2, day=28)


post_value_config = {
    "date": today_date.strftime("%Y%m%d"),
    "quantity": input("How many minutes did you Coding: "),

}

response = requests.post(url=post_value_endpoint, json=post_value_config, headers=headers)
print(response.text)

### Update pixel

update_pixel_endpoint = f"{pixela_endpoint}/{USERNAME}/graphs/{graph_id}/{today_date.strftime('%Y%m%d')}"

update_pixel_config = {
    "quantity": "300.00",
}

# response = requests.put(url=update_pixel_endpoint, json=update_pixel_config, headers=headers)
# print(response.text)

### Delete pixel

delete_pixel_endpoint = f"{pixela_endpoint}/{USERNAME}/graphs/{graph_id}/20230228"

# response = requests.delete(delete_pixel_endpoint, headers=headers)
# print(response.text)

