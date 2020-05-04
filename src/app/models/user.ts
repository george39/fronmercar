export class User {

    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public address: string,
        public email: string,
        public password: string,
        public image?: string
    ) {}
}