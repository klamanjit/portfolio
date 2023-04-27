from turtle import Turtle

class Scoreboard(Turtle):
    def __init__(self):
        super().__init__()
        self.color("white")
        self.penup()
        self.hideturtle()
        self.goto(-220, 240)
        self.score = 0
        self.update_score()

    def update_score(self):
        self.clear()
        self.write(f"Score: {self.score}",align= "center", font=("Courier", 24, "normal"))
        self.score += 1

    def game_over(self):
        self.goto(0, 0)
        self.write("Game over", align="center", font=("Courier", 24, "normal"))