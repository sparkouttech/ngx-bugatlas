export interface errorHttpRequest {
    request_url?:string
    request_method?:string
    payload?:any
    error_type?:any
    error_message?:string
    tag?:string
    meta?:any
    headers?:any
    status_code?:string
    route_path?:string
    user_id?:string
    browser_name?:string
    device_type?:string
}

export interface navHttpRequest {
    route_path?:string
    spend_time?:string
    meta?:any
    browser_name?:string
    device_type?:string
}