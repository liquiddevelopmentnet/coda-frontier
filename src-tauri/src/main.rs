#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod rpc;

#[tauri::command]
fn set_rpc(state: &str, detail: &str) -> String {
    rpc::set_rpc(state, detail);
    "Success".to_string()
}

fn main() {
    rpc::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_rpc])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
