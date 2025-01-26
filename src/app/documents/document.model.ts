export class document{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public url: string,
        public children: string[]
    ) { }
}