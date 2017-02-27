/* Magic Mirror
 * Module: MMM-ping
 *
 * By fewieden https://github.com/fewieden/MMM-ping
 *
 * MIT Licensed.
 */

/* eslint-env node */

const NodeHelper = require('node_helper');
const ping = require('ping');

module.exports = NodeHelper.create({
    socketNotificationReceived(notification, payload) {
        if (notification === 'CHECK_HOSTS') {
            payload.forEach((host) => {
                ping.sys.probe(host, (isAlive) => {
                    this.sendSocketNotification('HOST', { host, status: isAlive });
                });
            });
        }
    }
});
