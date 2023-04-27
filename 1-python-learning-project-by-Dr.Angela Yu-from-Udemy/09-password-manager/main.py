from tkinter import *
from tkinter import messagebox
import random
import pyperclip

# ---------------------------- PASSWORD GENERATOR ------------------------------- #

def generate_password():

    password_entry.delete(0, END)

    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

    nr_letters = random.randint(8, 10)
    nr_symbols = random.randint(2, 4)
    nr_numbers = random.randint(2, 4)

    password_letters = [random.choice(letters) for _ in range(nr_letters)]
    password_symbol = [random.choice(symbols) for _ in range(nr_symbols)]
    password_numbers = [random.choice(numbers) for _ in range(nr_numbers)]

    password_list = password_letters + password_symbol + password_numbers
    password = "".join(password_list)

    password_entry.insert(0, password)
    pyperclip.copy(password)



# ---------------------------- SAVE PASSWORD ------------------------------- #

def save():

    website = web_entry.get()
    email = email_entry.get()
    password = password_entry.get()

    if len(website) == 0 or len(email) == 0:
        messagebox.showinfo(title="Oops", message="Please fill all the blank!")
    else:
            message_check = messagebox.askokcancel(title=website, message=f"Confirm Email : {email} Password : {password}")

            if message_check is True:
                with open("data.txt", "a") as data:
                    data.write(f"{website} | {email} | {password}\n")
                    web_entry.delete(0, END)
                    password_entry.delete(0, END)



# ---------------------------- UI SETUP ------------------------------- #

window = Tk()
window.title("Password Manager")
window.config(padx=50, pady=50)

canvas = Canvas(width=200, height=200)
logo_img = PhotoImage(file="logo.png")
canvas.create_image(100, 100, image= logo_img)
canvas.grid(column=1, row=0)

web_label = Label(text="Website:")
web_label.grid(column=0, row=1)

email_label = Label(text="Email/Username:")
email_label.grid(column=0, row=2)

password_label = Label(text="Password:")
password_label.grid(column=0, row=3)

web_entry = Entry(width=39)
web_entry.grid(column=1, row=1, columnspan=2)

email_entry = Entry(width=39)
email_entry.grid(column=1, row=2, columnspan=2)
email_entry.insert(0, "manjit.wasit@gmail.com")

password_entry = Entry(width=21)
password_entry.grid(column=1, row=3)

generate_pass_button = Button(text="Generate Password", command=generate_password)
generate_pass_button.grid(column=2, row=3)

add_button = Button(text="Add", width=36, command=save)
add_button.grid(column=1, row=4, columnspan=2)







window.mainloop()