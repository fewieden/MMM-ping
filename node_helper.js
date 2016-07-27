const NodeHelper = require('node_helper');
const ping = require('ping');

module.exports = NodeHelper.create({
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'CHECK_HOSTS') {
            payload.forEach((host) => {
                ping.sys.probe(host, (isAlive) => {
                    this.sendSocketNotification('HOST', {'host': host, 'status': isAlive});
                });
            });
        }
    }
});