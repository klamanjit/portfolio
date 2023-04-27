from tkinter import *

def convert():
    #km = mile * 1.6
    mile = input_mile.get()
    km = float(mile) * 1.6
    label_con_km.config(text=str(km))



window = Tk()
window.title("Mile to Km Converter")
window.minsize(width=500, height=300)
window.config(padx=100, pady=100)

label_equal = Label(text="Is equal to", font=("Arial", 20, "normal"))
label_equal.grid(column=0,row=1)

input_mile = Entry(width=5)
input_mile.grid(column=1,row=0)


label_con_km = Label(text="0")
label_con_km.grid(column=1,row=1)

cal_butt = Button(text="Calculate", command=convert)
cal_butt.grid(column=1, row=2)

label_mile = Label(text="Miles", font=("Arial", 20, "normal"))
label_mile.grid(column=2,row=0)

label_km = Label(text="Km", font=("Arial", 20, "normal"))
label_km.grid(column=2,row=1)














window.mainloop()
