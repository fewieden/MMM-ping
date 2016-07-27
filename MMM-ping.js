Module.register("MMM-ping",{
    defaults: {
        colored: false,
        display: 'both',
        hosts: [],
        updateInterval: 5
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.status = {};
        this.checkHosts();
        setInterval(() => {
            this.checkHosts();
        }, this.config.updateInterval*60000);
    },

    checkHosts: function(){
        this.sendSocketNotification('CHECK_HOSTS', this.config.hosts);
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.style.textAlign = 'left';
        var hosts = Object.keys(this.status);
        if(hosts.length > 0){
            for(var i = 0; i < hosts.length; i++){
                var isOnline = this.status[hosts[i]];
                if(isOnline && (this.config.display === 'both' || this.config.display === 'online') ||
                    !isOnline && (this.config.display === 'both' || this.config.display === 'offline')){

                    var div = document.createElement("div");
                    var span = document.createElement("span");
                    span.innerHTML = isOnline ? '&#9899;' : '&#9898;';
                    if(this.config.colored){
                        span.style.color = isOnline ? 'green' : 'red';
                    }
                    var host = document.createElement("span");
                    host.innerHTML = hosts[i];
                    div.appendChild(span);
                    div.appendChild(host);
                    wrapper.appendChild(div);
                }
            }
        }
        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "HOST"){
            this.status[payload.host] = payload.status;
            this.updateDom();
        }
    }
});