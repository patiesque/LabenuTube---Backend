export class Video {
    constructor(
        private id: string,
        private title: string,
        private link: string,
        private description: string,
        private createDate: Date,
        private userId: string,
    ) { }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getLink(): string {
        return this.link;
    }

    public setLink(link: string): void {
        this.link = link;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getCreateDate(): Date {
        return this.createDate;
    }

    public setCreateDate(createDate: Date): void {
        this.createDate = createDate;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }



}
