import { VideoGateway } from "../../gateway/videoGateway";
import { NotFound } from "../../error/NotFound";

export class GetVideoDetailUC {
    constructor(
        private videoGateway: VideoGateway,
    ){}

    public async execute(input: GetVideoDetailUCInput): Promise<GetVideoDetailUCOutput>{
        const video = await this.videoGateway.getVideoById(input.id);

        if(!video){
            throw new NotFound;
        }

        return{
            id: video.getId(),
            title: video.getTitle(),
            link: video.getLink(),
            description: video.getDescription(),
            createDate: video.getCreateDate(),
            userId: video.getUserId(),
            name: video.getName(),
            image: video.getImage()
        }
    }
}

export interface GetVideoDetailUCInput{
    id: string;
}

export interface GetVideoDetailUCOutput{
    id: string;
    title: string;
    link: string;
    description: string;
    createDate: Date;
    userId: string;
    name: string;
    image: string;
}