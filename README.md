# MMM-ping [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/fewieden/MMM-ping/master/LICENSE) [![Build Status](https://travis-ci.org/fewieden/MMM-ping.svg?branch=master)](https://travis-ci.org/fewieden/MMM-ping) [![Code Climate](https://codeclimate.com/github/fewieden/MMM-ping/badges/gpa.svg?style=flat)](https://codeclimate.com/github/fewieden/MMM-ping) [![Known Vulnerabilities](https://snyk.io/test/github/fewieden/mmm-ping/badge.svg)](https://snyk.io/test/github/fewieden/mmm-ping)

Ping Module for MagicMirror<sup>2</sup><br>
this fork replaces the host IP or URL with any string so you can name the hosts for the output

## Example

![](.github/example.jpg)

## Dependencies

* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* npm
* [ping](https://www.npmjs.com/package/ping)

## Installation

1. Clone this repo into `~/MagicMirror/modules` directory.
1. Configure your `~/MagicMirror/config/config.js`:

    ```
    {
        module: 'MMM-ping',
        position: 'bottom_right',
        config: {
            hosts: [
                'www.github.com',
                '192.168.1.1'
            ],
            hostnames: [
                'Github',
                'Router'
            ]
        }
    }
    ```

1. Run command `npm install --productive` in `~/MagicMirror/modules/MMM-ping` directory.
1. Run command `sudo chmod u+s /bin/ping`.

## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `colored` | false | show badge in color or not |
| `display` | 'both' | what should be displayed 'online', 'offline' or 'both' |
| `hosts` | [] | addresses to ping |
| `updateInterval` | 5 | how often the module should ping the hosts in minutes |
| `font` | 'medium' | font size 'xsmall', 'small', 'medium', 'large' or 'xlarge' |
