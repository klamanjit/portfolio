from turtle import Turtle

ALIGNMENT = "center"
FONT = ("Arial", 20, "normal")

class Scoreboard(Turtle):
    def __init__(self):
        super().__init__()
        self.score = 0
        #read high score from data file
        with open("data.txt", mode="r") as data:
            self.high_score = int(data.read())
        self.color("white")
        self.penup()
        self.goto(0, 450)
        self.hideturtle()
        self.update_score()

    def update_score(self):
        self.clear() #to clear score
        self.write(f"Score: {self.score} High Score: {self.high_score}", align=ALIGNMENT, font=FONT)

    def increase_score(self):
        self.score += 1
        self.clear()
        self.update_score()


    #reset scoreboard for adding high score
    def reset(self):
        if self.score > self.high_score:
            self.high_score = self.score
            with open("data.txt", mode="w") as data: #write new high score to data file
                data.write(f"{self.high_score}")
        self.score = 0  # need to be below if code
        self.update_score()

    # def game_over(self):
    #     self.goto(0,0)
    #     self.write("Game over", align=ALIGNMENT, font=FONT)