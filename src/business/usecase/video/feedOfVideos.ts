import { VideoGateway } from "../../gateway/videoGateway";

export class FeedOfVideosUC {
    constructor(
        private videoGateway: VideoGateway
    ){}

    public async execute(): Promise<FeedOfVideosUCOutputVideo[]>{

        const videos = await this.videoGateway.getFeedVideos()

        if(!videos){
            throw new Error("Feed of videos are Empty")
        }

        return videos.map(video => {
                return {
                    id: video.getId(),
                    title: video.getTitle(),
                    link: video.getLink(),
                    description: video.getDescription(),
                    createDate: video.getCreateDate(),
                    userId: video.getUserId(),
                    name: video.getName(),
                    image: video.getImage()
                }
            })
        
    }
}

export interface FeedOfVideosUCOutputVideo{
    id: string;
    title: string;
    link: string;
    description: string;
    createDate: Date;
    userId: string;
    name: string;
    image: string;
}

