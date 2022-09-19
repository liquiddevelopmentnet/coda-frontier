extern crate discord_rpc_client;

use discord_rpc_client::Client;
use std::time::SystemTime;

static mut CLIENT: Option<Client> = None;

pub fn init() {
    unsafe {
        CLIENT = Some(Client::new(1017047174686715975).expect("Failed to create client"));
        CLIENT.as_mut().unwrap().start();

        set_rpc("Booting", "");
    }
}

pub fn set_rpc(state: &str, detail: &str) {
    unsafe {
        if let Err(why) = CLIENT.as_mut().unwrap().set_activity(|a| {
            if detail != "" {
                a.state(state)
                    .details(detail)
                    .timestamps(|t| {
                        t.start(
                            SystemTime::now()
                                .duration_since(SystemTime::UNIX_EPOCH)
                                .unwrap()
                                .as_millis() as u64,
                        )
                    })
                    .assets(|a| a.large_image("lki").large_text("Coda Gaming™️"))
                    .instance(true)
            } else {
                a.state(state)
                    .timestamps(|t| {
                        t.start(
                            SystemTime::now()
                                .duration_since(SystemTime::UNIX_EPOCH)
                                .unwrap()
                                .as_millis() as u64,
                        )
                    })
                    .assets(|a| a.large_image("lki").large_text("Coda Gaming™️"))
                    .instance(true)
            }
        }) {
            println!("Failed to set presence: {}", why);
        }
    }
}
