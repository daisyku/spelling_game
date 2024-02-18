from PyDictionary import PyDictionary

dictionary = PyDictionary()

alphabet = [chr(i) for i in range(ord('a'), ord('z')+1)]
#print(alphabet)

import random

import nltk
nltk.download('words')
from nltk.corpus import words

alphabet = [chr(i) for i in range(ord('a'), ord('z')+1)]

# Step 0: Dictionary
dictionary = words.words()

# Step 1: 7 letters
def random_letters():
    return random.sample(alphabet, 7)

# Step 2: Get special letter
def get_special_letter(list):
    return random.choice(list)

# Step 3: Find all pangrams of seven letters
def pangramList(random_letters):
    pangrams = []
    for word in dictionary:
        if len(word) >= 7:
            if set(word).issubset(set(random_letters)) and set(random_letters).issubset(set(word)):
                pangrams.append(word)
    return pangrams


# Step 4: All other correct guesses besides pangrams
def availableWordsList(letters, special_letter):
    availableWords = []
    for word in dictionary:
        if len(word) >= 4 and set(word).issubset(set(letters)) and special_letter in word:
            availableWords.append(word)
    return availableWords

# Step 5: Instance of a spellingBee game
def generate_pangrams():
    lst = []
    letters = []

    # We are looping until we have 7 distinct letters that make >= 1 pangrams
    while not lst:
        letters = random_letters()
        lst = pangramList(letters)
        if lst:
            special_letter = get_special_letter(letters)
            correct_inputs = availableWordsList(letters, special_letter)
    return lst, letters, special_letter, correct_inputs

# Step 6: Getting score for each correct user input
def getScore(word):
    if len(word) == 4:
        return 1
    return len(word)

# def playSpellingBee():
#     pts = 0
#     alreadyGuessed = []
#     print(letters)
#     print(special_letter)

#     i = 0
#     while i < 5 :
#         guess = input()
#         if guess in availWords:
#             if guess in alreadyGuessed:
#                 print("Already Guessed")
#             else:
#                 if guess in pangrams:
#                     print("Pangram!")
#                 else:
#                     print("Nice!")
#                 pts += getScore(guess)
#                 alreadyGuessed.append(guess)
#         else:
#             print("Try again!")
#         i += 1
        
#     print(pts)
#     print(alreadyGuessed)


#playSpellingBee()
        



