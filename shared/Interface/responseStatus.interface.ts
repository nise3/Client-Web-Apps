export interface ResponseStatus {
    success: boolean;
    code: number;
    query_time: number;
  }

export interface ResponseStatusDTO extends ResponseStatus {
    message: string;
  }