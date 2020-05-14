import { VideoGateway } from "../../gateway/videoGateway";
import { AuthenticationGateway } from "../../gateway/authenticationGateway";
import { FeedVideos } from "../../entities/feedVideos";


export class GetAllVideosUserByIdUC {
  constructor(
      private videoGateway: VideoGateway,
      private authenticationGateway: AuthenticationGateway,
      ) { }

  async execute(input: GetVideoInput): Promise<GetVideoOutput[]> {

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

    let videos: FeedVideos[] | undefined
    
    if (!userInfo) {
      throw new Error("User not found!")
    }
    if(input.id){
      videos = await this.videoGateway.getAllVideosUserById(input.id);
    }else if(!input.id){
      videos = await this.videoGateway.getAllVideosUserById(userInfo.id);
    }

    if(!videos){
      throw new Error ("nao tem")
    }

    return videos.map(video => { 
      return {
        id: video.getId(),
        title: video.getTitle(),
        link: video.getLink(),
        description: video.getDescription(),
        creationDate: video.getCreateDate(),
        userId: video.getUserId(),
        name: video.getName(),
        image: video.getImage()
      };
    });
  }
}

export interface GetVideoOutput {
  id: string;
  title: string;
  link: string;
  description:string;
  userId: string;
  name: string;
  image: string;
}
export interface GetVideoInput {
  id: string;
  token: string;
}
