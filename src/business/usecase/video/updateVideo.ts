import { VideoGateway } from "../../gateway/videoGateway";
import { AuthenticationGateway } from "../../gateway/authenticationGateway";

export class UpdateVideoUC {
    constructor(
        private videoGateway: VideoGateway,
        private authenticationGateway: AuthenticationGateway,
        ){}

    public async execute(input: UpdateVideoUCInput): Promise<UpdateVideoUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

        if(!userInfo){
            throw new Error("You must be connected!")
        }

        const video = await this.videoGateway.getVideoById(input.id);
        if(!video){
            throw new Error("Video not found");
        }

        if(userInfo.id !== video.getUserId() ){
            throw new Error("You cannot update this video!")
        }

        await this.videoGateway.updateVideo(input.id, userInfo.id, input.title, input.description)

        return {
            message: `Video ${input.title} updated Successfully!`
        }
    }
}

export interface UpdateVideoUCInput {
    token: string;
    id: string;
    title: string;
    description: string;
}

export interface UpdateVideoUCOutput {
    message: string;
}