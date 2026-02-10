import { getAndroidDeviceName, getAndroidPlatformVersion, getAppPath } from 'lib/env';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { config } = require('./wdio.shared.conf')

const headless = process.argv.includes('--headless')

const browserOptions = {
    args: [
        '--allowed-ips',
        'start-maximized',
        'disable-gpu',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-infobars',
        '--window-size=1366,784',
        '--disable-setuid-sandbox',
    ],
}

if (headless) {
    browserOptions.args.push('headless=new')
}

const browserCap = {
    browserName: 'chrome',
    'wdio:chromedriverOptions': {},
    'goog:chromeOptions': browserOptions,
}

const androidAppPath = getAppPath();
const androidDeviceName = getAndroidDeviceName();
const androidPlatformVersion = getAndroidPlatformVersion();

const androidCap = {
    'appium:platformName': 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:orientation': 'PORTRAIT',
    'appium:deviceName': androidDeviceName,
    'appium:platformVersion': androidPlatformVersion,
    'appium:app': androidAppPath,
    'appium:appWaitActivity': '*',
    'appium:noReset': true,
    'appium:autoGrantPermissions': true,
    'appium:deviceType': 'phone',
}

config.capabilities = {
    mobile: {
        capabilities: androidCap,
    },
    browser: {
        capabilities: browserCap,
    },
}

config.services = [
    ['chromedriver'],
    [
        'appium',
        {
            command: 'appium',
        },
    ],
]

exports.config = config