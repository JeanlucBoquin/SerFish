export interface Usuario {
    uid  :  string;
    name :  string;
    email:  string;
    role :  string;
}

export interface LoginResponse {
    ok    : boolean;
    msg?  : string;
    data? : Data;
    token?: string;
}

export interface Data {
    role:     string;
    google:   boolean;
    name:     string;
    email:    string;
    password: string;
    uid:      string;
}

export interface UpdateData {
    name: string;
    email: string;
    uid?: string;
    role?: string;
    google?: boolean;
}

export interface UpdateDataResponse {
    ok: boolean;
    userUpdate: UpdateData
}

export interface UpdatePassword {
    oldPassword: string;
    newPassword: string;
    uid?: string;
}

export interface UpdatePasswordResponse {
    ok: boolean;
    msg: string;
}