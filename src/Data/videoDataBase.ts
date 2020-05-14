import { BaseDB } from "./baseDatabase";
import { VideoGateway } from "../business/gateway/videoGateway";
import { Video } from "../business/entities/videos";
import { DuplicateUserError } from "../business/error/DuplicateUserError";
import { FeedVideos } from "../business/entities/feedVideos";

export class VideoDB extends BaseDB implements VideoGateway {
    private userTableName = "Users";
    private videoTableName = "Videos";


    private mapDBVideoToVideo(input?: any): FeedVideos | undefined {
        return (
            input &&
            new FeedVideos(
                input.id,
                input.title,
                input.link,
                input.description,
                input.createDate,
                input.userId,
                input.name,
                input.image
            )
        )
    }

    async createVideo(video: Video) {
        try {
            await this.connection
                .insert({
                    id: video.getId(),
                    title: video.getTitle(),
                    link: video.getLink(),
                    description: video.getDescription(),
                    createDate: video.getCreateDate(),
                    userId: video.getUserId(),
                })
                .into(this.videoTableName);
        } catch (err) {
            console.log(err)
            if (err.code === 'ER_DUP_ENTRY') {
                throw new DuplicateUserError()
            } else {
                throw err
            }
        }
    }

    public async getAllVideosUserById(id: string): Promise<FeedVideos[]> {
        const result = await this.connection.raw(`
        SELECT ${this.videoTableName}.*, ${this.userTableName}.name
        FROM ${this.videoTableName}
        JOIN ${this.userTableName} ON ${this.videoTableName}.userId = ${this.userTableName}.id
        WHERE userId = '${id}'; 
        `);
        console.log("result", result)
        return result[0].map((video: any) => {
            return this.mapDBVideoToVideo(result[0][0])

        })
    }

    public async updateVideo(id: string, userId: string, title: string, description: string): Promise<void> {
        await this.connection.raw(`
            UPDATE ${this.videoTableName}
            SET title = '${title}', description = '${description}'
            WHERE id = '${id}' AND userId = '${userId}'
        `)
    }

    public async getVideoById(id: string): Promise<FeedVideos | undefined> {
        const result = await this.connection.raw(`
            SELECT v.*, u.name, u.image
            FROM ${this.videoTableName} v
            JOIN ${this.userTableName} u
            ON u.id = v.userId
            WHERE v.id = '${id}'
        `)

        if (!result[0][0]) {
            return undefined;
        };

        return this.mapDBVideoToVideo(result[0][0])

    }

    public async deleteVideo(id: string, userId: string): Promise<void> {
        await this.connection.raw(`
            DELETE FROM ${this.videoTableName}
            WHERE id = '${id}' AND userId = '${userId}';
        `)
    }

    public async getFeedVideos(limit: number, offset: number): Promise<FeedVideos[] | undefined> {
        const result = await this.connection.raw(`
            SELECT v.*, u.name, u.image
            FROM ${this.videoTableName} v
            JOIN ${this.userTableName} u
            ON v.userId = u.id
            ORDER BY v.createDate DESC
            LIMIT ${limit} OFFSET ${offset};
        `);

        if (!result[0][0]) {
            return undefined;
        };

        return await result[0].map((video: any) => {
            return this.mapDBVideoToVideo(result[0][0])
        });
    };

}
