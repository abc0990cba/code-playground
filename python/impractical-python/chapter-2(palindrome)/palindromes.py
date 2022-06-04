"""Find palindromes (letter palingrams) in a words file."""

import load_words


def find_palindromes():
    file_name = "words.txt"
    word_list = load_words.load(file_name)

    palindrome_list = []

    for word in word_list:
        if (len(word) > 1) and (word == word[::-1]):
            palindrome_list.append(word)

    return palindrome_list


if __name__ == "__main__":
    lst = find_palindromes()

    print("\nNumber of palindromes found = {}\n".format(len(lst)))

    # print in list format with no quotes or commas:
    print(*lst, sep="\n")

