#
# Copyright github.com/liquiddevelopmentnet, 2022.
# All rights reserved. Do not distribute without permission.
#

import os
from datetime import datetime

with open("src/function/BackgroundImages.ts", "w") as f:
    f.write("/*\n* Copyright Project Coda, LLC, 2022.\n* All rights reserved.\n*/\n\n")
    f.write(f"// Automatically generated.\n\n")
    exports = []
    for file in os.listdir("src/assets/includedBackgrounds"):
        exports.append(file.split(".")[0])
        f.write(
            f"""import {file.split(".")[0]} from \"../assets/includedBackgrounds/{file}\"\n""")

    f.write("\n")
    f.write(f"export default [{', '.join(exports)}]")

    f.write(f"\n\n// Latest change: {datetime.now(tz=None)}")
