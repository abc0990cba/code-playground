"""Load a text file as a list.

Args:
    file_name (str): The file location

Exceptions:
    -IOError if filename not found.

Returns:
    list: a list of all words in text file in lower case.

    Requires-import sys
"""

import sys


def load(file_name):
    """Open a text file & turn contents into a list of lowercase strings."""
    try:
        with open(file_name) as fin:
            word_list = fin.read().strip().split("\n")
            word_list = [x.lower() for x in word_list]
            return word_list
    except IOError as e:
        print("{}\nError opening {}. Terminating program.".format(e, file_name))
        sys.exit(1)


if __name__ == "__main__":
    word_list = load("words.txt")
    print(word_list[10:20])
