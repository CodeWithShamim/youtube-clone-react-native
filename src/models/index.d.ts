import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VideoMetaData = {
  readOnlyFields: 'updatedAt';
}

type CommentsMetaData = {
  readOnlyFields: 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly Video?: Video | null;
  readonly sub?: string | null;
  readonly subscribers?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Video {
  readonly id: string;
  readonly createdAt: string;
  readonly title: string;
  readonly thumbnail: string;
  readonly videoUrl: string;
  readonly duration: number;
  readonly views: number;
  readonly User?: User | null;
  readonly Comments?: (Comments | null)[] | null;
  readonly updatedAt?: string | null;
  readonly videoUserId?: string | null;
  constructor(init: ModelInit<Video, VideoMetaData>);
  static copyOf(source: Video, mutator: (draft: MutableModel<Video, VideoMetaData>) => MutableModel<Video, VideoMetaData> | void): Video;
}

export declare class Comments {
  readonly id: string;
  readonly createdAt: string;
  readonly comment: string;
  readonly likes: string;
  readonly dislikes: string;
  readonly replies: string;
  readonly videoID?: string | null;
  readonly User?: User | null;
  readonly Video?: Video | null;
  readonly userID?: string | null;
  readonly updatedAt?: string | null;
  readonly commentsUserId?: string | null;
  constructor(init: ModelInit<Comments, CommentsMetaData>);
  static copyOf(source: Comments, mutator: (draft: MutableModel<Comments, CommentsMetaData>) => MutableModel<Comments, CommentsMetaData> | void): Comments;
}