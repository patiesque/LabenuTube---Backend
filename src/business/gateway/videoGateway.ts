import { Video } from "../entities/videos";
import { FeedVideos } from "../entities/feedVideos";

export interface VideoGateway {
  createVideo(user: Video): Promise<void>;
  getAllVideosUserById(id: string): Promise<FeedVideos[]>;
  updateVideo(id: string, user_id: string, title: string, description: string): Promise<void>;
  getVideoById(id: string): Promise<FeedVideos | undefined>;
  deleteVideo(id: string, user_id: string): Promise<void>;
  getFeedVideos(): Promise<FeedVideos[] | undefined>;
}
