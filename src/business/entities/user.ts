export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birthday: string,
        private image: string,
        private password: string,
    ) { }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getBirthday(): string {
        return this.birthday;
    }

    public setBirthday(birthday: string): void {
        this.birthday = birthday;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }



}
