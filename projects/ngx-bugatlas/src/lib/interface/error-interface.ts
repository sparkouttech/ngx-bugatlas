export interface ErrorPayload {
    request_url?: string;
    request_method?: string;
    payload?: any;
    device_id?: string;
    ip_address?: string;
    operating_system?: string;
    os_version?: string;
    browser?: string;
    browser_version?: string;
    error_type: number;
    error_message: string;
    tag: string;
    meta: Record<string, any>;
}