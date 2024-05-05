use crate::GenPasswdResp;

use super::GenPasswdReq;
use rand::prelude::SliceRandom;
// const vec of UpperCase, LowerCase, Digit, SpecialChar
const LETTERS: [char; 26] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];
const DIGITS: [char; 10] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const SPECIAL_CHARS: [char; 32] = [
    '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=',
    '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~',
];

pub fn gen_pass(request: GenPasswdReq) -> GenPasswdResp {
    let mut passwd: Vec<char> = Vec::new();
    let mut rng = rand::thread_rng();
    let mut all_char: Vec<char> = Vec::new();
    if request.is_include_upper_case_latters {
        let letter = LETTERS.choose(&mut rng).unwrap();
        passwd.push(*letter);
        all_char.extend(LETTERS.iter());
    }
    if request.is_include_lower_case_latters {
        let letter = LETTERS.choose(&mut rng).unwrap().to_ascii_lowercase();
        passwd.push(letter);
        all_char.extend(LETTERS.iter().map(|c| c.to_ascii_lowercase()));
    }
    if request.is_include_numbers {
        let digit = DIGITS.choose(&mut rng).unwrap();
        passwd.push(*digit);
        all_char.extend(DIGITS.iter());
    }
    if request.is_include_symbols {
        let special_char = SPECIAL_CHARS.choose(&mut rng).unwrap();
        passwd.push(*special_char);
        all_char.extend(SPECIAL_CHARS.iter());
    }
    let remain_length = request.passwd_length - passwd.len() as u8;
    // if remain_length is 0, return passwd
    if remain_length == 0 {
        return GenPasswdResp {
            data: passwd.iter().collect(),
        };
    }
    // remain_length is not 0, generate the rest of the password
    // shuffle all_char
    all_char.shuffle(&mut rng);
    for _i in 0..remain_length {
        let c = all_char.choose(&mut rng).unwrap();
        passwd.push(*c);
    }
    GenPasswdResp {
        data: passwd.iter().collect(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_gen_pass() {
        let req = GenPasswdReq {
            passwd_length: 8,
            is_include_upper_case_latters: true,
            is_include_lower_case_latters: true,
            is_include_numbers: true,
            is_include_symbols: true,
        };
        let res = gen_pass(req);
        assert_eq!(res.data.len(), 8);
    }
}
