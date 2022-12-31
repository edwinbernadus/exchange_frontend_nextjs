class global_param {

    getVer(){
        return 9
    }

    getIsDebug() {
        return false
    }


    getVercelStatus() {
        if (process.env.NEXT_PUBLIC_VERCEL_URL) {
            return true
        } else {
            return false
        }
    }

    getServerUrl() {
        if (this.getVercelStatus()) {
            return "https://privateexchangebackendgolang-production.up.railway.app"
        } else {
            return "http://localhost:8080"
        }

        // export var golangServerName = "http://localhost:8080"
        // export const golangServerName = "http://140.82.42.53:8081"
        // export const golangServerName = "https://privateexchangebackendgolang-production.up.railway.app"
    }
}

let c = new global_param()
export default c
