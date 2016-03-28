export interface FlowRequestParameters {
    flowChunkNumber: number;
    flowChunkSize: number;
    flowCurrentChunkSize: number;
    flowTotalSize: number;
    flowIdentifier: string;
    flowFilename: string;
    flowRelativePath: string;
    flowTotalChunks: number;
}

export interface FlowChunk {
    flowObj: Flow;
    fileObj: FlowFile;
    offset: number;
    tested: boolean;
    retries: number;
    pendingRetry: boolean;
    preprocessState: number;
    readState: number;
    loaded: number;
    total: number;
    chunkSize: number;
    startByte: number;
    xhr: XMLHttpRequest;

    // Methods
    abort(): void;
    getParams(): FlowRequestParameters;
    getTarget(): string;
    message(): void;
    prepareXhrRequest(method: string, isTest: boolean, paramsMethod: string, blob: Blob): FormData | Blob | void;
    preprocessFinished(): void;
    send(): void;
    progress(): number;
    sizeUploaded(): number;
    status(): string;
    test(): void;

    // Events
    doneHandler: (_) => void;
    progressHandler: (_) => void;
    testHandler: (_) => void;
}

export interface FlowFile {
    flowObj: Flow;
    file: File;
    name: string;
    relativePath: string;
    size: number;
    uniqueIdentifier: string;
    averageSpeed: number;
    currentSpeed: number;
    chunks: [FlowChunk];
    paused: boolean;
    error: boolean;

    // Methods
    progress(relative): number;
    pause(): void;
    resume(): void;
    cancel(): void;
    retry(): void;
    bootstrap(): void;
    isUploading(): boolean;
    isComplete(): boolean;
    sizeUploaded(): number;
    timeRemaining(): number;
    getExtension(): string;
    getType(): string;
}

export interface FlowOptions {
    target: string | ((flowFile: FlowFile, flowChunk: FlowChunk, isTest: boolean) => string);
    singleFile: boolean;
    chunkSize: number;
    forceChunkSize: boolean;
    simultaneousUploads: number;
    fileParameterName: string;
    query: Object  | ((flowFile: FlowFile, flowChunk: FlowChunk, isTest: boolean) => string);
    headers: Object  | ((flowFile: FlowFile, flowChunk: FlowChunk, isTest: boolean) => string);
    withCredentials: boolean;
    method: string;
    testMethod: string | ((flowFile: FlowFile, flowChunk: FlowChunk) => string);
    uploadMethod: string | ((flowFile: FlowFile, flowChunk: FlowChunk) => string);
    allowDuplicateUploads: boolean;
    prioritizeFirstAndLastChunk: boolean;
    testChunks: boolean;
    preprocess: (flowChunk: FlowChunk) => void;
    initFileFn: (flowFile: FlowFile, flowChunk: FlowChunk) => void;
    readFileFn: (flowFile: FlowFile, startByte: number, endByte: number, fileType: string, flowChunk: FlowChunk) => void;
    generateUniqueIdentifier: () => string;
    maxChunkRetries: number;
    chunkRetryInterval: number;
    progressCallbacksInterval: number;
    speedSmoothingFactor: number;
    successStatuses: [number];
    permanentErrors: [number];
}

export interface Flow {

    constructor(options?: FlowOptions);

    // Properties
    support: boolean;
    supportDirectory: boolean;
    opts: FlowOptions;
    files: [FlowFile];

    // Methods
    assignDrop(domNodes: HTMLElement |[HTMLElement])
    unAssignDrop(domNodes: HTMLElement |[HTMLElement])
    on(event: string, callback: () => void);
    off()
    off(event: string)
    off(event: string, callback: () => void);
    upload(): void;
    pause(): void;
    resume(): void;
    cancel(): void;
    progress(): void;
    isUploading(): void;
    addFile(file: File): void;
    removeFile(file: FlowFile): void;
    getFromUniqueIdentifier(uniqueIdentifier): string;
    getSize(): number;
    sizeUploaded(): number;
    timeRemaining(): number;
}
