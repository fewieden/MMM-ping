# MMM-ping
Ping Module for MagicMirror<sup>2</sup>

## Dependencies
  * An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
  * npm
  * [ping](https://www.npmjs.com/package/ping)

## Installation
 1. Clone this repo into `~/MagicMirror/modules` directory.
 2. Configure your `~/MagicMirror/config/config.js`:

    ```
    {
        module: 'MMM-ping',
        position: 'bottom_right',
        config: {
            hosts: [
                'www.github.com',
                'forum.magicmirror.builders'
            ]
        }
    }
    ```
 3. Run command `npm install` in `~/MagicMirror/modules/MMM-ping` directory.
 4. Run command `sudo chmod u+s /bin/ping`.

## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `colored` | false | show badge in color or not |
| `display` | 'both' | what should be displayed 'online', 'offline' or 'both' |
| `hosts` | [] | addresses to ping |
| `updateInterval` | 5 | how often the module should ping the hosts in minutes |
| `font` | 'medium' | font size 'xsmall', 'small', 'medium', 'large' or 'xlarge' |