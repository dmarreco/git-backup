'use strict';

const LogLevels = {
    DEBUG : 0,
    INFO  : 1,
    WARN  : 2,
    ERROR : 3
};

// most of these are available through the Node.js execution environment for Lambda
// see https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html
const DEFAULT_CONTEXT = {
    awsRegion: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
    functionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
    functionVersion: process.env.AWS_LAMBDA_FUNCTION_VERSION,
    functionMemorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
    stage: process.env.ENVIRONMENT || process.env.STAGE
};

function getContext () {
    return DEFAULT_CONTEXT;
}

// default to debug if not specified
function logLevelName() {
    return process.env.LOG_LEVEL || 'DEBUG';
}

function isEnabled (level) {
    return level >= LogLevels[logLevelName()];
}

function appendError(params, err) {
    if (!err) {
        return params;
    }

    let stackAsArray = err && err.stack && err.stack.split(/\r?\n/);

    return Object.assign(
        {},
        params || {}, 
        { errorName: err.name, errorMessage: err.message, stackTrace: stackAsArray }
    );
}

function log (levelName, message, params, printFunc = console.log) {
    if (!isEnabled(LogLevels[levelName])) {
        return;
    }

    let context = getContext();
    let logMsg = Object.assign({
        message,
        level: levelName
    }, context, {params});

    //eslint-disable-next-line no-console
    printFunc(JSON.stringify(logMsg));
}

export const debug = (msg, params) => log('DEBUG', msg, params);
export const info  = (msg, params) => log('INFO',  msg, params);
export const warn  = (msg, params, error) => log('WARN',  msg, appendError(params, error));
export const error = (msg, params, error) => log('ERROR', msg, appendError(params, error), console.error);

export const enableDebug = () => {
    const oldLevel = process.env.LOG_LEVEL;
    process.env.LOG_LEVEL = 'DEBUG';

    // return a function to perform the rollback
    return () => {
        process.env.LOG_LEVEL = oldLevel;
    };
};