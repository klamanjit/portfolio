from turtle import Turtle
import random

COLORS = ["red", "green", "yellow", "blue", "purple", "orange"]
START_MOVE = 5
ADD_SPEED = 10

class Car_manager:
    def __init__(self):
        self.all_car = []
        self.car_speed = START_MOVE


    def create_car(self):
        random_chance = random.randint(1, 6)
        if random_chance == 1:
            new_car = Turtle("square")
            new_car.shapesize(stretch_wid=1, stretch_len=2)
            new_car.penup()
            new_car.color(random.choice(COLORS))
            random_y = random.randint(-250, 250)
            new_car.goto(280, random_y)
            self.all_car.append(new_car)

    def car_move(self):
        for car in self.all_car:
            car.backward(self.car_speed)

    def level_up(self):
        self.car_speed += ADD_SPEED
