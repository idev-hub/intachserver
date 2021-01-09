export default interface ISubject {
    number: number,
    discipline?: string,
    teacher?: string,
    cabinet?: string,
    time?: {
        "start"?: string,
        "end"?: string
    },
    canceled?: boolean,
    replacement?: boolean
}
