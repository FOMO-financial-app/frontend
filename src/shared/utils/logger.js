const isDev = import.meta.env.DEV;

export const logger = {
    error: (msg, ...args) => isDev && console.error(msg, ...args),
    warn:  (msg, ...args) => isDev && console.warn(msg, ...args),
    log:   (msg, ...args) => isDev && console.log(msg, ...args),
};