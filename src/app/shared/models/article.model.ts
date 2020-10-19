export class Hashtag { 
    hashtag: string;
}

export class Article {
    _id: string;
    url: string;
    pkey?: string;
    real: string;
    hashtags: Array<Hashtag>;
    submittedDate: Date;
    user: string
}