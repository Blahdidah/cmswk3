export class message{
    constructor(
        public id: number,
        public subject: string,
        public msgText: string,
        public sender: string,
    ) { }
}