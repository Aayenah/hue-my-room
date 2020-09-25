require('dotenv').config();
const tmi = require('tmi.js');
const fetch = require('node-fetch');
const states = require('./states').hueStates;

const HUE_LIGHT_URI = `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}/lights/4`
const HUE_STATE_URI = `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}/lights/4/state`;

// Config options
const options = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN,
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

// Create a client with options specified above
const client = new tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
    console.log(`* Connected to ${address}:${port}`);
});


const incrementValue = 20;

client.on('message', async (target, context, message, self) => {
    if(self) return; //if it's the bot, return

    if(!message.startsWith('!')) return; //if it doesn't start with prefix '!', return

    const command = message.trim(); // remove whitespace from command
    const commandName = command.substring(1); // remove the prefix from command
    
    if(commandName === 'hue'){
        client.say(target, 'You can find the list of commands below.');
    }

    if(states[commandName]){ // if commandName exists in our states.js 
        if(commandName === 'satUp'){ // if we need to increase saturation
            await getHueState().then(value => { // get current saturation
                let sat = value.sat + incrementValue; // hold current sat plus increment
                console.log(`SAT: ${sat}`);
                states[commandName].value.sat = Math.min(Math.max(0, sat), 254);
                console.log(`NEW SAT: ${states[commandName].value.sat}`);
            })
            .catch(error => {
                console.log(error);
                client.say(target, 'Error: Unable to increase saturation.')
            });
        }
        else if(commandName === 'satDown'){
            await getHueState().then(value => {
                let sat = value.sat - incrementValue;
                console.log(`SAT: ${sat}`);
                states[commandName].value.sat = Math.min(Math.max(0, sat), 254);
                console.log(`NEW SAT: ${states[commandName].value.sat}`);
            })
            .catch(error => {
                console.log(error);
                client.say(target, 'Error: Unable to decrease saturation.')
            });
        }
        setHueState(states[commandName]);
        client.say(target, `Lights: ${states[commandName].label}`);
    }
    
});

function setHueState(hueState){
    fetch(HUE_STATE_URI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hueState.value)
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch((e) => console.log(e));
}

async function getHueState(){
    let response = await fetch(HUE_LIGHT_URI);
    let json = await response.json();
    console.log(`MY JSON: ${JSON.stringify(json.state)}`);
    return json.state;
}