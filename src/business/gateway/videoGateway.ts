import { Video } from "../entities/videos";
import { FeedVideos } from "../entities/feedVideos";

export interface VideoGateway {
  createVideo(user: Video): Promise<void>;
  updateVideo(id: string, user_id: string, title: string, description: string): Promise<void>;
  deleteVideo(id: string, user_id: string): Promise<void>;
  getFeedVideos(limit: number, offset: number): Promise<FeedVideos[] | undefined>;
  getAllVideosUserById(id: string): Promise<FeedVideos[]>;
  getVideoById(id: string): Promise<FeedVideos | undefined>;
}
