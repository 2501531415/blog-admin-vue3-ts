interface ElFile extends File {
    uid: number;
}
type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';

export type HeaderType = {
    token:string
}

export type UploadFile = {
    name: string;
    percentage?: number;
    status: UploadStatus;
    size: number;
    response?: unknown;
    uid: number;
    url?: string;
    raw: ElFile;
};

export type responseType = {
    status:number,
    url:string,
    message:string
}
