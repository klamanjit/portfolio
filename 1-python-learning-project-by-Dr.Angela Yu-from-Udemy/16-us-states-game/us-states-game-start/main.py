import turtle
import pandas
screen = turtle.Screen()
screen.title("U.S. state Game")
image = "blank_states_img.gif" #create variable that match the image's name
screen.addshape(image) #add shape of image on screen

turtle.shape(image) #add image as turtle




#state
data = pandas.read_csv("50_states.csv")
state = data.state
state_list = state.to_list()
print(state_list)


guessed_state =[]



while len(guessed_state) < 50:
    answer_state = screen.textinput(title=f"{len(guessed_state)}/50 States Correct",
                                    prompt="what's another state's name?").title() # change only first alphabet to upper case
    if answer_state == "Exit":
        # states to learn.csv
        state_to_learn = []
        for miss_state in state_list:
            if miss_state not in guessed_state:
                state_to_learn.append(miss_state)
        print(state_to_learn)
        new_data = pandas.DataFrame(state_to_learn)
        new_data.to_csv("state_to_learn.csv")
        break
    if answer_state in state_list:
        guessed_state.append(answer_state)
        t = turtle.Turtle()
        t.penup()
        t.hideturtle()
        state_data = data[data.state == answer_state]
        t.goto(int(state_data.x), int(state_data.y)) #use int to convert str to int
        t.write(answer_state)











## function to check (x,y) on click
# def get_mouse_click_coor(x, y):
#     print(x, y)
#
# turtle.onscreenclick(get_mouse_click_coor)
#
#
#
#
#
#
# turtle.mainloop() # keep screen open even code are finish running




