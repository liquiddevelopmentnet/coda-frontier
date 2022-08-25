const init = () => {
    var settings = window.localStorage.getItem('_silset')
    if (settings == null || settings == undefined) {
        window.localStorage.setItem('_silset', 'Y29kYQ'+Buffer.from(JSON.stringify({}), "utf-8").toString("base64url"))
        return {}
    }
}

const get = (key: string) => {
    var settings = window.localStorage.getItem('_silset')
    if (settings == null) {
        init()
        return undefined
    }
    var obj = Buffer.from(settings.substring(6), "base64url").toString("utf-8")
    return JSON.parse(obj)[key]
}

const set = (key: string, value: any) => {
    var settings = window.localStorage.getItem('_silset')
    if (settings == null) {
        init()
        return undefined
    }
    var obj = JSON.parse(Buffer.from(settings.substring(6), "base64url").toString("utf-8"))
    obj[key] = value
    window.localStorage.setItem('_silset', 'Y29kYQ'+Buffer.from(JSON.stringify(obj), "utf-8").toString("base64url"))
}

const conf = (key: string, value: any) => {
    if (get(key) == undefined) {
        set(key, value)
    }
}

export default { init, get, set, conf }