import json
import os
from colorama import init, Fore, Back, Style

settings = json.load(open("./src/i18n/language/_settings.json"))
default_lang = json.load(
    open(f"./src/i18n/language/{settings['defaultLanguage']}.json"))


def cls():
    os.system('cls' if os.name == 'nt' else 'clear')


def sort(passf, tof):
    passf_keys = list(passf.keys())
    tof_keys = list(tof.keys())
    new_tof = {}

    for key in passf_keys:
        if key not in tof_keys:
            pass
        else:
            new_tof[key] = tof[key]

    return tof


def main():
    init()
    cls()
    print(f"{Fore.GREEN}Copyright (C) 2022 Project Coda, LLC{Style.RESET_ALL}")
    print("")
    print(f"{Fore.GREEN}Welcome to the i18n translation tool!{Style.RESET_ALL}")
    print(f"{Fore.GREEN}This tool will help you to easily create translations for project coda.{Style.RESET_ALL}")
    print("\n\n")
    print(f"{Fore.CYAN}What do you want to do?\n{Style.RESET_ALL}")
    print(f"{Fore.YELLOW}[0]{Style.RESET_ALL} List all languages")
    print(f"{Fore.YELLOW}[1]{Style.RESET_ALL} Translate to a new language")
    print(f"{Fore.YELLOW}[2]{Style.RESET_ALL} Update languages")
    print(f"{Fore.YELLOW}[3]{Style.RESET_ALL} Exit")
    option = input(f"\n{Style.DIM}Select {Style.RESET_ALL}> {Fore.CYAN}")

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
        name = input("Enter a name for the language (for example: en): ")
        friendly_name = input(
            "Enter a friendly name for the language (for example: English): ")
        new_json = {}

        print("\n")

        for x in source_json:
            c = input(f"{x}: {source_json[x]} -> ")
            new_json[x] = c

        with open(f"./src/i18n/language/{name}.json", "w") as f:
            f.write(json.dumps(new_json, indent=2))

        with open(f"./src/i18n/language/_settings.json", "w") as f:
            settings['languageNames'][name] = friendly_name
            f.write(json.dumps(settings, indent=2))

        print("Thanks!")

        print("\n")

        input("Press enter to continue")
        cls()
        return main()

    if option == "2":
        cls()

        not_up_to_date_langs = []

        langs: list[str] = os.listdir("./src/i18n/language/")
        langs.remove("_settings.json")
        for lang in langs:
            lang_json = json.load(open(f"./src/i18n/language/{lang}"))
            for x in default_lang:
                if x not in lang_json and lang not in not_up_to_date_langs:
                    not_up_to_date_langs.append(lang)
                    continue

        if len(not_up_to_date_langs) == 0:
            print("No language needs to be updated.")

            print("\n")

            input("Press enter to continue")
            cls()
            return main()

        print("Following languages need to be updated:\n")

        for x in range(len(not_up_to_date_langs)):
            print(f"[{x}] {not_up_to_date_langs[x]}")

        print("\n")

        lang_to_update_i = input("Which one do you want to update: ")
        lang_to_update = not_up_to_date_langs[int(lang_to_update_i)]
        lang_json = json.load(open(f"./src/i18n/language/{lang_to_update}"))

        cls()

        for x in default_lang:
            if x not in lang_json:
                c = input(f"{x}: {default_lang[x]} -> ")
                lang_json[x] = c

        with open(f"./src/i18n/language/{lang_to_update}", "w") as f:
            f.write(json.dumps(sort(default_lang, lang_json), indent=2))

        print("Thanks!")

        print("\n")

        input("Press enter to continue")
        cls()
        return main()

    if option == "3":
        cls()
        print("Thanks for using this tool!")
        return


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("^C")
        exit(0)
