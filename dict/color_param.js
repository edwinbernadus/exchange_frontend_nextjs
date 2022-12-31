// red
// F5475D

// green
// 11CB81

// brown
// 3C2601

// grey1
// 1E2025

// grey2
// 292D35


class color_param {

    getBlueColor() {
        return "#1E90FF"
    }

    getBlueColor2() {
        return "#037BFF"
    }

    getRedColor() {
        return "#F5475D"
    }

    getGreenColor() {
        return "#11CB81"
    }

    getGrey1() {
        return "#1E2025"
    }

    getGrey2() {
        return "#292D35"
    }

    getDefaultGrey() {

        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        if (mql.matches) {
            return this.getGrey1()
        } else {
            return "#D3D3D3"
        }
    }
}


let c = new color_param()
export default c