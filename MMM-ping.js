/* global Module Log */

/* Magic Mirror
 * Module: MMM-ping
 *
 * By fewieden https://github.com/fewieden/MMM-ping
 *
 * MIT Licensed.
 */

Module.register('MMM-ping', {
    defaults: {
        colored: false,
        display: 'both',
        hosts: [],
		hostnames: [],    //new
        updateInterval: 5,
        font: 'medium'
    },

    start() {
        Log.info(`Starting module: ${this.name}`);
        this.status = {};
        this.checkHosts();
        setInterval(() => {
            this.checkHosts();
        }, this.config.updateInterval * 60000);
    },

    checkHosts() {
        this.sendSocketNotification('CHECK_HOSTS', this.config.hosts);
    },

    getDom() {
        const wrapper = document.createElement('div');
        wrapper.classList.add(this.config.font);
        wrapper.style.textAlign = 'left';
        const hosts = Object.keys(this.status);
		const hostnames = this.config.hostnames; //new
        if (hosts.length > 0) {
            for (let i = 0; i < hosts.length; i += 1) {
                const isOnline = this.status[hosts[i]];
                if ((isOnline && (this.config.display === 'both' || this.config.display === 'online')) ||
                    (!isOnline && (this.config.display === 'both' || this.config.display === 'offline'))) {
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    span.innerHTML = isOnline ? '&#9899;' : '&#9898;';
                    if (this.config.colored) {
                        span.style.color = isOnline ? 'green' : 'red';
                    }
                    const host = document.createElement('span');
                    host.innerHTML = hostnames[i];   //changed
                    div.appendChild(span);
                    div.appendChild(host);
                    wrapper.appendChild(div);
                }
            }
        }
        return wrapper;
    },

    socketNotificationReceived(notification, payload) {
        if (notification === 'HOST') {
            this.status[payload.host] = payload.status;
            this.updateDom();
        }
    }
});
