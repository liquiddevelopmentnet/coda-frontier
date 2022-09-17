#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate discord_rpc_client;

use discord_rpc_client::Client;

fn main() {

  let mut drpc = Client::new(1017047174686715975).expect("Failed to create client");

  drpc.start();

  drpc.set_activity(|act| act.state("Idling"))
      .expect("Failed to set activity");

  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
