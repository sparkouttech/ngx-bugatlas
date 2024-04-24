export interface httpRequest {
    request_url?:string
    request_method?:string
    payload?:any
    error_type?:any
    error_message?:string
    tag?:string
    meta?:any
}