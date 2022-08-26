import random
import string
import os
import sys


def rnd_str(length: int) -> str:
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for _ in range(length))
    return result_str


directory = sys.argv[1]

for filename in os.listdir(directory):
    new_name = rnd_str(10) + ".png"
    os.rename(os.path.join(directory, filename), os.path.join(directory, new_name))
    print(f"{filename} -> {new_name}")
