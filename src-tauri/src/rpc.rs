use discord_rich_presence::{
    activity::{self, Activity},
    DiscordIpc, DiscordIpcClient,
};
use std::{
    time::{SystemTime, UNIX_EPOCH},
    vec,
};

static mut CLIENT: Option<DiscordIpcClient> = None;

pub fn init() {
    unsafe {
        CLIENT =
            Some(DiscordIpcClient::new("1017047174686715975").expect("Failed to create client"));
        CLIENT.as_mut().unwrap().connect();

        set_rpc("Booting", "");
    }
}

pub fn set_rpc(state: &str, detail: &str) {
    unsafe {
        let mut activity = activity::Activity::new();

        let enable_timer = true;

        if detail != "" {
            activity = activity.details(&detail);
        }

        if state != "" {
            activity = activity.state(&state);
        }

        let mut assets = activity::Assets::new();

        assets = assets.large_image("lki");

        assets = assets.large_text("Coda Gaming™️");

        activity = activity.assets(assets);

        activity = activity.buttons(vec![
            activity::Button::new("Launch Coda", "https://youtu.be/dQw4w9WgXcQ"),
            activity::Button::new("Visit Deveden", "https://deveden.co"),
        ]);

        let time_unix = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs() as i64;

        activity = activity.timestamps(activity::Timestamps::new().start(time_unix));

        CLIENT
            .as_mut()
            .unwrap()
            .set_activity(activity)
            .expect("Failed to set activity");
    }
}
