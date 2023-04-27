from turtle import Turtle

STARTING_POSITION =(0, -280)
START_MOVE = 10

class Player(Turtle):
    def __init__(self):
        super().__init__()
        self.shape("turtle")
        self.color("white")
        self.penup()
        self.rerun_position()
        self.setheading(90)


    def move(self):
        self.fd(10)

    def rerun_position(self):
        self.goto(STARTING_POSITION)
