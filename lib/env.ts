/**
 * Leitura de variáveis de ambiente para testes.
 * Use BACKEND_URL e FRONTEND_URL para sobrescrever baseURL por ambiente (CI, staging, prod).
 */

const DEFAULTS = {
  BACKEND_URL: 'https://jsonplaceholder.typicode.com',
  FRONTEND_URL: 'http://the-internet.herokuapp.com',
  ANDROID_DEVICE_NAME: 'Android_Test',
  ANDROID_PLATFORM_VERSION: '14',
  IOS_DEVICE_NAME: 'iPhone 12',
  IOS_PLATFORM_VERSION: '14.5',
  APP_PATH: './apps/android.wdio.native.app.v2.0.0.apk',
} as const;

export function getBaseUrl(kind?: 'BACKEND_URL' | 'FRONTEND_URL'): string {
  if (kind === 'BACKEND_URL') {
    return process.env.BACKEND_URL ?? DEFAULTS.BACKEND_URL;
  }
  if (kind === 'FRONTEND_URL') {
    return process.env.FRONTEND_URL ?? DEFAULTS.FRONTEND_URL;
  }
  return DEFAULTS.FRONTEND_URL;
}

export function getAndroidDeviceName(): string {
  return process.env.ANDROID_DEVICE_NAME ?? DEFAULTS.ANDROID_DEVICE_NAME;
}

export function getAndroidPlatformVersion(): string {
  return process.env.ANDROID_PLATFORM_VERSION ?? DEFAULTS.ANDROID_PLATFORM_VERSION;
}

export function getIOSDeviceName(): string {
  return process.env.IOS_DEVICE_NAME ?? DEFAULTS.IOS_DEVICE_NAME;
}

export function getIOSPlatformVersion(): string {
  return process.env.IOS_PLATFORM_VERSION ?? DEFAULTS.IOS_PLATFORM_VERSION;
}

export function getAppPath(): string {
  return process.env.APP_PATH ?? DEFAULTS.APP_PATH;
}