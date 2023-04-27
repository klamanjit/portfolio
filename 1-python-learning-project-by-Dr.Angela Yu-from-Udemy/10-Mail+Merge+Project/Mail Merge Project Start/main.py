#TODO: Create a letter using starting_letter.txt 
#for each name in invited_names.txt
#Replace the [name] placeholder with the actual name.
#Save the letters in the folder "ReadyToSend".
    
#Hint1: This method will help you: https://www.w3schools.com/python/ref_file_readlines.asp
    #Hint2: This method will also help you: https://www.w3schools.com/python/ref_string_replace.asp
        #Hint3: THis method will help you: https://www.w3schools.com/python/ref_string_strip.asp

PLACEHOLDER = "[name]" #[name] we'r going to replace this

with open("./Input/Names/invited_names.txt", mode="r") as data:
    names = data.readlines() # .readlines make string into list
    print(names)


with open("./Input/Letters/starting_letter.txt", mode="r") as file:
    start = file.read()
    for name in names:
        stripped_name = name.strip() # remove space between names
        new_letter = start.replace(PLACEHOLDER, stripped_name)
        with open(f"./Output/ReadyToSend/letter_for_{stripped_name}.txt", mode="w") as completed_letter: #write in for loop
            completed_letter.write(new_letter)


