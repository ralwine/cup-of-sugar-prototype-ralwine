import dayjs from "dayjs";

export function DateTimeFormatter(dateTime) {
    return(
        dayjs(dateTime).format('MM/DD/YY [at] HH:mm')
    )
}

export function DateFormatter(date) {
    return(
        dayjs(date).format('MM/DD/YY')
    )
}
