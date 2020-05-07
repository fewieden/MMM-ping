/**
 * @file MMM-ping.js
 *
 * @author fewieden
 * @license MIT
 *
 * @see https://github.com/fewieden/MMM-ping
 */

/* global Module Log */

/**
 * @external Module
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/module.js
 */

/**
 * @external Log
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/logger.js
 */

/**
 * @module MMM-ping
 * @description Frontend for the module to display data.
 *
 * @requires external:Module
 * @requires external:Log
 */
Module.register('MMM-ping', {
    /** @member {Object} status - List of results with hosts and their online status. */
    status: [],

    /** @member {Object} onlineMapping - Map online states to strings. */
    onlineMapping: {
        true: 'online',
        false: 'offline'
    },

    /**
     * @member {Object} defaults - Defines the default config values.
     * @property {boolean} colored - Flag to render map in color or greyscale.
     * @property {string} display - Online states which should be displayed.
     * @property {string[]} hosts - List of hosts to ping.
     * @property {int} updateInterval - Speed of update.
     * @property {string} font - Class name for font size.
     */
    defaults: {
        colored: false,
        display: 'both',
        hosts: [],
        updateInterval: 5,
        font: 'medium'
    },

    /**
     * @member {Object} voice - Defines the voice recognition part.
     * @property {string} mode - MMM-voice mode of this module.
     * @property {string[]} sentences - All commands of this module.
     */
    voice: {
        mode: 'PING',
        sentences: [
            'OPEN HELP',
            'CLOSE HELP',
            'SHOW ALL Hosts',
            'HIDE HOSTS'
        ]
    },

    /**
     * @function getTranslations
     * @description Translations for this module.
     * @override
     *
     * @returns {Object.<string, string>} Available translations for this module (key: language code, value: filepath).
     */
    getTranslations() {
        return {
            en: 'translations/en.json',
            de: 'translations/de.json'
        };
    },

    /**
     * @function getStyles
     * @description Style dependencies for this module.
     * @override
     *
     * @returns {string[]} List of the style dependency filepaths.
     */
    getStyles() {
        return ['MMM-ping.css'];
    },

    /**
     * @function getTemplate
     * @description Nunjuck template.
     * @override
     *
     * @returns {string} Path to nunjuck template.
     */
    getTemplate() {
        return 'templates/MMM-ping.njk';
    },

    /**
     * @function getTemplateData
     * @description Data that gets rendered in the nunjuck template.
     * @override
     *
     * @returns {object} Data for the nunjuck template.
     */
    getTemplateData() {
        const status = this.status.filter(entry => this.config.display === 'both' || this.config.display === this.onlineMapping[entry.online]);

        return {
            config: this.config,
            status
        };
    },

    /**
     * @function start
     * @description Initiates ping interval.
     * @override
     *
     * @returns {void}
     */
    start() {
        Log.info(`Starting module: ${this.name}`);
        this.checkHosts();
        setInterval(() => {
            this.checkHosts();
        }, this.config.updateInterval * 60000);
    },

    /**
     * @function checkHosts
     * @description Sends a notification to node_helper to ping hosts again.
     * @override
     *
     * @returns {void}
     */
    checkHosts() {
        this.sendSocketNotification('CHECK_HOSTS', this.config.hosts);
    },

    /**
     * @function socketNotificationReceived
     * @description Handles incoming messages from node_helper.
     * @override
     *
     * @param {string} notification - Notification name
     * @param {*} payload - Detailed payload of the notification.
     */
    socketNotificationReceived(notification, payload) {
        if (notification === 'STATUS_UPDATE') {
            this.status = payload;
            this.updateDom(300);
        }
    },

    /**
     * @function notificationReceived
     * @description Handles incoming broadcasts from other modules or the MagicMirror core.
     * @override
     *
     * @param {string} notification - Notification name
     * @param {*} payload - Detailed payload of the notification.
     * @param {MM} [sender] - The sender of the notification. If sender is undefined the sender is the core.
     */
    notificationReceived(notification, payload, sender) {
        if (notification === 'ALL_MODULES_STARTED') {
            this.sendNotification('REGISTER_VOICE_MODULE', this.voice);
        } else if (notification === 'VOICE_PING' && sender.name === 'MMM-voice') {
            this.checkCommands(payload);
        } else if (notification === 'VOICE_MODE_CHANGED' && sender.name === 'MMM-voice' && payload.old === this.voice.mode) {
            this.sendNotification('CLOSE_MODAL');
        }
    },

    /**
     * @function checkCommands
     * @description Checks for voice commands.
     *
     * @param {string} data - Text with commands.
     *
     * @returns {void}
     */
    checkCommands(data) {
        if (/(HELP)/g.test(data)) {
            if (/(CLOSE)/g.test(data) && !/(OPEN)/g.test(data)) {
                this.sendNotification('CLOSE_MODAL');
            } else if (/(OPEN)/g.test(data) && !/(CLOSE)/g.test(data)) {
                this.sendNotification('OPEN_MODAL', {
                    template: 'templates/HelpModal.njk',
                    data: {
                        ...this.voice,
                        fns: {
                            translate: this.translate.bind(this)
                        }
                    }
                });
            }
        } else if (/(HIDE)/g.test(data) && /(HOSTS)/g.test(data)) {
            this.sendNotification('CLOSE_MODAL');
        } else if (/(SHOW)/g.test(data) && /(HOSTS)/g.test(data)) {
            this.sendNotification('OPEN_MODAL', {
                template: 'templates/PingModal.njk',
                data: {
                    config: this.config,
                    status: this.status,
                    fns: {
                        translate: this.translate.bind(this)
                    }
                }
            });
        }
    }
});
