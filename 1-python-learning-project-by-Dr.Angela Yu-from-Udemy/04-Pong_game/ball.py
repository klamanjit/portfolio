from turtle import Turtle

class Ball(Turtle):
    def __init__(self):
        super().__init__()
        self.shape("circle")
        self.color("white")
        self.shapesize(stretch_wid=1, stretch_len=1)
        self.penup()
        #add x,y attibult for eassy to create bounce()
        self.x_move = 10
        self.y_move = 10
        #Make ball increase speed
        self.move_speed = 0.1

    def move(self):
        new_x = self.xcor() + self.x_move
        new_y = self.ycor() + self.y_move
        self.goto(new_x, new_y)



    def bounce_y(self):
        #Mutiply y cor with -1 for y to change direction
        self.y_move *= -1

    def bounce_x(self):
        self.x_move *= -1
        #Change speed of the ball with paddle
        self.move_speed *= 0.9

    def reset_position(self):
        self.goto(0,0)
        #Set ball speed back to normal
        self.move_speed = 0.1

        self.bounce_x()







