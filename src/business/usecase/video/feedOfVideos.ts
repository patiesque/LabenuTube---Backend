import { VideoGateway } from "../../gateway/videoGateway";

export class FeedOfVideosUC {
    constructor(
        private videoGateway: VideoGateway
    ) { }

    private POSTS_PER_PAGE = 10;

    public async execute(input: FeedOfVideosUCInput): Promise<FeedVideoUCOutput> {

        let page = input.page >= 1 ? input.page : 1;

        const offset = this.POSTS_PER_PAGE * (page - 1);

        const videos = await this.videoGateway.getFeedVideos(this.POSTS_PER_PAGE, offset)

        if (!videos) {
            throw new Error("Feed of videos are Empty")
        }

        return {
            videos: videos.map(video => {
                return {
                    id: video.getId(),
                    title: video.getTitle(),
                    link: video.getLink()
                }
            })
        }

    }
}
export interface FeedVideoUCOutput {
    videos: FeedOfVideoUCOutput[];
}
export interface FeedOfVideoUCOutput {
    id: string;
    title: string;
    link: string;
}

export interface FeedOfVideosUCInput {
    page: number;
}
 