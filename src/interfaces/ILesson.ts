import ISubject from "./ISubject";

export default interface ILesson {
    date?: string,
    group?: string,
    week?: number,
    data: ISubject | ISubject[],
}
