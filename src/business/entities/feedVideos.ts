import { Video } from "./videos";

export class FeedVideos extends Video {
    constructor(
        id: string,
        title: string,
        link: string,
        description: string,
        createDate: Date,
        userId: string,
        private name: string,
        private image: string
    ) {
        super(id, title, link, description, createDate, userId);
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }


}