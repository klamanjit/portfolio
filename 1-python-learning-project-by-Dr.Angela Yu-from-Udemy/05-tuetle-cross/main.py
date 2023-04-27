from turtle import Screen
from player import Player
from car_manager import Car_manager
from scoreboard import Scoreboard
import time




screen =Screen()
screen.bgcolor("black")
screen.setup(width=600, height=600)
screen.tracer(0)

player = Player()
car_manager =Car_manager()
scoreboard =Scoreboard()

screen.listen()
screen.onkey(player.move, "Up")

game_on = True

while game_on:
    time.sleep(0.1)
    screen.update()
    car_manager.create_car()
    car_manager.car_move()

    for car in car_manager.all_car:
        if player.distance(car) < 20:
            game_on = False
            scoreboard.game_over()

    if player.ycor() > 280:
        player.rerun_position()
        car_manager.level_up()
        scoreboard.update_score()





screen.exitonclick()



