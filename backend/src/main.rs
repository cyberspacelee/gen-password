use axum::{routing::post, Json, Router};
use backend::{gen_pass, GenPasswdReq, GenPasswdResp};
use http::StatusCode;
use tower_http::{cors::{Any, CorsLayer}, services::ServeDir};

#[tokio::main]
async fn main() {
    // build our application with a route
    // allow `GET` and `POST` when accessing the resource
    let cors = CorsLayer::new()
        .allow_methods(Any)
        // allow requests from any origin
        .allow_origin(Any)
        .allow_headers(Any);
    let app = Router::new()
    .nest_service("/", ServeDir::new("assets"))
        .route("/api/genPass", post(handle_gen_pass))
        .layer(cors);

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// handler for `POST /genPass`
async fn handle_gen_pass(Json(request): Json<GenPasswdReq>) -> (StatusCode, Json<GenPasswdResp>) {
    // validate the request
    if request.passwd_length == 0 {
        return (
            StatusCode::BAD_REQUEST,
            Json(GenPasswdResp {
                data: "password length cannot be 0".to_string(),
            }),
        );
    }
    let mut as_least_length = 0;
    if request.is_include_upper_case_latters {
        as_least_length += 1;
    }
    if request.is_include_lower_case_latters {
        as_least_length += 1;
    }
    if request.is_include_numbers {
        as_least_length += 1;
    }
    if request.is_include_symbols {
        as_least_length += 1;
    }
    if request.passwd_length < as_least_length {
        return (
            StatusCode::BAD_REQUEST,
            Json(GenPasswdResp {
                data: "password length is too short".to_string(),
            }),
        );
    }
    (StatusCode::OK, Json(gen_pass(request)))
}
