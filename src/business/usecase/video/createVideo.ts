import { VideoGateway } from "../../gateway/videoGateway";
import { v4 } from "uuid";
import { Video } from "../../entities/videos";
import { AuthenticationGateway } from "../../gateway/authenticationGateway";


export class CreateVideoUC {
  constructor(
    private videoGateway: VideoGateway,
    private authenticationGateway: AuthenticationGateway 

    ) {}

  public async execute(input: CreateUserUCInput): Promise<CreateUserUCOutput> {
      const id = v4();

      const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token)

      if(!userInfo){
        throw new Error("User info is wrong")
    }
      const video = new Video(
          id,  
          input.title, 
          input.link, 
          input.description,  
          new Date(),
          userInfo.id); 
     
      await this.videoGateway.createVideo(video);

   
      return {
        message: "Video created successfully " 
      };
  }
}
export interface CreateUserUCInput {
  title: string;
  link: string;
  description:string;
  token: string;
}

export interface CreateUserUCOutput {
  message: string;
}
