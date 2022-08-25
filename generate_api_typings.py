import json
from datetime import datetime

path = "src/assets/api.json"

mappings: dict[str, str] = json.load(open(path))

namespaces: list[str] = []
keys: list[str] = []

for entry in mappings:
    a: list[str] = entry.split(".")

    namespace: str = a[0]
    key: str = a[1]

    if namespace not in namespaces:
        namespaces.append(namespace)

    keys.append(key)

with open("./src/api.d.ts", "w") as f:
    f.write("/*\n* Copyright Project Coda, LLC, 2022.\n* All rights reserved.\n*/\n\n")
    f.write(f"// Automatically generated from {path}.\n\n")
    f.write("type ApiNamespace = \'" + '\' | \''.join(namespaces) + "\'\n")
    f.write("type ApiKey = \'" + '\' | \''.join(keys) + "\'")

    f.write(f"\n\n// Latest change: {datetime.now(tz=None)}")

print(f"Generated typings for {path}")
