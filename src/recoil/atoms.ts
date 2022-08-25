import { atom } from "recoil";

export const electronState = atom<{ is: boolean, ipc: any }>({
    key: "electronState",
    default: {
        is: false,
        ipc: null,
    },
})

export const hostState = atom<ProvidedHostState>({
    key: "hostState",
    default: {
        secure: false,
        host: "localhost",
        suffix: "",
        port: 8080,
    }
});