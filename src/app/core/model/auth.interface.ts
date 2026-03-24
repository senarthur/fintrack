export interface LoginRequest {
    login: string,
    password: string
}

export interface LoginResponse {
    token: string
    name: string
}

export interface RegisterRequest {
    name: string,
    login: string,
    password: string
}