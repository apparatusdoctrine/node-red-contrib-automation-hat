/**
 * Copyright 2018 Martin Rowan <martin@rowannet.co.uk>
 * Derived from an initial implementation for the Explorer HAT Copyright 2016 Pimoroni Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function(RED) {
    "use strict";

    const nodeName = "rpi-automation-hat-led";

    function debugLog(message){
        if( RED.settings.verbose ) RED.log.info("nodeName (debug): " + message);
    }


    var fs = require("fs");
    var spawn = require("child_process").spawn;

    var cmd = __dirname+"/../library/automationhatlink";
    var allOK = true;

    try {
        fs.statSync(cmd);
    }
    catch(err) {
        RED.log.error(nodeName +": Library: " + cmd + " Not Found!");
        allOK = false;
    }
    if ( !(fs.statSync(cmd).mode & 1) ) {
        RED.log.error(nodeName + ": Library: " + cmd + " must be executable (755)");
        allOK = false;
    }

    // the magic to make python print stuff immediately
    process.env.PYTHONUNBUFFERED = 1;

    function AutomationHatLEDs(config) {
        RED.nodes.createNode(this, config);
        // Configuration Properties
        this.ledName = config.ledName
        
        var node = this;
        // Init
        this.status({fill:"red",shape:"ring",text:"Disconnected"});

        if (allOK === true) {
            if (this.ledName !== undefined) {
                // WORK IS DONE HERE
                debugLog("Configure LED - " + this.ledName);
            }
        }
    }
    RED.nodes.registerType(nodeName, AutomationHatLEDs);

}