module.exports = {
    hueStates: {
        on: {
            value: { on: true },
            label: 'Lights on!',
            desc: 'turns lights on'
        },
        off: {
            value: { on: false },
            label: 'Lights off!',
            desc: 'turns lights off'
        },
        red: {
            value: {
                hue: 0,
                sat: 254,
                on: true
            },
            label: 'Lights changed to red!',
            desc: 'changes lights to red'
        },
        blue: {
            value: {
                hue: 46014,
                sat: 254,
                on: true,
            },
            label: 'Lights changed to blue!',
            desc: 'changes lights to blue'
        },
        green: {
            value: {
                hue: 24123,
                sat: 254,
                on: true,
            },
            label: 'Lights changed to green!',
            desc: 'changes lights to green'
        },
        pink: {
            value: {
                hue: 54656,
                sat: 190,
                on: true,
            },
            label: 'Lights changed to pink!',
            desc: 'changes lights to pink'
        },
        purple: {
            value: {
                hue: 49251,
                sat: 219,
                on: true,
            },
            label: 'Lights changed to purple!',
            desc: 'changes lights to purple'
        },
        white: {
            value: {
                hue: 49251,
                sat: 0,
                on: true,
                ct: 153
            },
            label: 'Lights changed to white!',
            desc: 'changes lights to white'
        },
        satUp: {
            value: {
                sat: 0
            },
            label: 'Sat went UP',
            desc: 'increases saturation'
        },
        satDown: {
            value: {
                sat: 0
            },
            label: 'Sat went DOWN',
            desc: 'decreases saturation'
        }
    }
} 