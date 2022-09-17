#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate discord_rpc_client;

use discord_rpc_client::Client;
use std::time::SystemTime;

fn main() {
    let mut drcp: Client = Client::new(1017047174686715975).expect("Failed to create client");
    drcp.start();

    if let Err(why) = drcp.set_activity(|a| {
        a.state("Speed Programming 1v1")
            .details("Ingame")
            .timestamps(|t| {
                t.start(
                    SystemTime::now()
                        .duration_since(SystemTime::UNIX_EPOCH)
                        .unwrap()
                        .as_millis() as u64,
                )
            })
            .assets(|a| a.large_image("lki").large_text("Coda"))
            .instance(true)
    }) {
        println!("Failed to set presence: {}", why);
    }

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
