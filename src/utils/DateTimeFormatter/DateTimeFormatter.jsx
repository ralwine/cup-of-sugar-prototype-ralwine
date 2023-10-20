import dayjs from "dayjs";

export function DateTimeFormatter(dateTime) {
    return(
        dayjs(dateTime).format('MM/DD/YY [at] hh:mm A')
    )
}

export function DateFormatter(date) {
    return(
        dayjs(date).format('MM/DD/YY')
    )
}
