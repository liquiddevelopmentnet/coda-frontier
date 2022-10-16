#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod discord_builder;
mod rpc;

pub use discord_sdk as ds;

#[tauri::command]
fn set_rpc(state: &str, detail: &str) -> String {
    rpc::set_rpc(state, detail);
    "ok".to_string()
}

#[tauri::command]
fn get_discord_user() -> String {
    unsafe {
        let isnull = discord_builder::CONNECTED_USER.is_none();
        if isnull {
            return "null".to_string();
        }
        let user = discord_builder::CONNECTED_USER.as_ref().unwrap();
        let username = user.username.clone();
        let discriminator = user.discriminator.clone();
        let id = user.id.0;
        let json = serde_json::json!({
            "username": username,
            "discriminator": discriminator,
            "id": id
        });
        tracing::info!(user = ?json, "got discord user");
        json.to_string()
    }
}

#[tokio::main]
async fn main() {
    tokio::spawn(async {
        rpc::init().await;
    });

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_rpc, get_discord_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
