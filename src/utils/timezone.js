import moment from "moment-timezone";

export const toUserTimeZone = (utcDate) => {
    return moment(utcDate).tz(moment.tz.guess()).format('DD/MM/YYYY')
}

export const dateAndTime = (utcDate) => {
    return moment(utcDate).tz(moment.tz.guess()).format('DD/MM/YYYY h:m A')
}