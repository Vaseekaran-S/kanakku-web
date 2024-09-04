import moment from "moment-timezone";

export const toUserTimeZone = (utcDate) => {
    return moment(utcDate).tz(moment.tz.guess()).format('DD/MM/YYYY')
}