import { selector } from "recoil"

import { hostState } from "./atoms"

export const hostUrlState = selector({
    key: "hostUrlState",
    get: ({ get }) => {
        const host: ProvidedHostState = get(hostState)
        var hostString = ""
        hostString += host.secure ? "https" : "http"
        hostString += "://"
        hostString += host.host
        hostString += host.port != null ? ":" + host.port : ""
        hostString += "/"
        hostString += host.suffix
        return hostString
    }
})