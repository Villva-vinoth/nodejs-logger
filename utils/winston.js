const { transports, format, createLogger } = require("winston");
const { combine, timestamp, colorize, printf } = format;
const DailyRotateFile = require("winston-daily-rotate-file");
const moment = require("moment");


const startDate = moment().startOf('week').format('YYYY-MM-DD');
const endDate = moment().endOf('week').format('YYYY-MM-DD');

const logFileName = `application-${startDate}-to-${endDate}`;

const customFormatColor = combine(
  timestamp(),
  colorize(),
  printf(
    ({ timestamp, level, message }) => `{${timestamp} ${level} : ${message}}`
  )
);

const customFormat = combine(
  timestamp(),
  format.json()
);

const transport = [
  new transports.Console({ format: customFormatColor }),
  new transports.File({ filename: "./logs/winston.log", format: customFormat }),
  new DailyRotateFile({
    filename: `./logs/${logFileName}-w-%DATE%.log`,
    datePattern:'WW',
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "1d",
    format: customFormat,
  }),
  new transports.File({
    filename: "./logs/winstonError.log",
    level: "error",
    format: customFormat,
  }),
];

const winstonLogger = createLogger({
  level: "silly",
  // format:customFormat,
  transports: transport,
});

module.exports = {
  winstonLogger,
};
