use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct GenPasswdReq {
    pub passwd_length: u8,
    pub is_include_upper_case_latters: bool,
    pub is_include_lower_case_latters: bool,
    pub is_include_numbers: bool,
    pub is_include_symbols: bool,
}

#[derive(Serialize, Debug)]
pub struct GenPasswdResp {
    pub data: String,
}
