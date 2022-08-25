import json
import os

settings = json.load(open("./src/i18n/language/_settings.json"))
default_lang = json.load(open(f"./src/i18n/language/{settings['defaultLanguage']}.json"))


def cls():
    os.system('cls' if os.name=='nt' else 'clear')


def main():
    print("What do you want to do?\n")
    option = input("[0] View a list of languages | [1] Translate to a new language | [2] Update a language: ")

    if option == "0":
        cls()
        langs: list[str] = os.listdir("./src/i18n/language/")
        langs.remove("_settings.json")

        for langI in range(len(langs)):
            print(f"[{langI}] {langs[langI]}")

        print("\n")

        input("Press enter to continue")
        cls()
        return main()

    if option == "1":
        cls()
        langs: list[str] = os.listdir("./src/i18n/language/")
        langs.remove("_settings.json")

        for langI in range(len(langs)):
            print(f"[{langI}] {langs[langI]}")

        source_i = input("Select a language you want to translate from: ")
        source = langs[int(source_i)]
        source_json = json.load(open(f"./src/i18n/language/{source}"))

        cls()

        print("Translating from", source)
        name = input("Enter a name for the language: ")
        new_json = {}

        print("\n")

        for x in source_json:
            c = input(f"{x}: {source_json[x]} -> ")
            new_json[x] = c

        with open(f"./src/i18n/language/{name}.json", "w") as f:
            f.write(json.dumps(new_json, indent=2))

        print("Thanks!")

        print("\n")

        input("Press enter to continue")
        cls()
        return main()

    if option == "2":
        cls()
        
        print("Option not yet implemented, sorry.")

        print("\n")

        input("Press enter to continue")
        cls()
        return main()


if __name__ == "__main__":
    main()
