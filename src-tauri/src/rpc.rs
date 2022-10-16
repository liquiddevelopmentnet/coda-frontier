pub use discord_sdk as ds;
use ds::activity::Secrets;
use std::{num::NonZeroU32, time::SystemTime};
pub use tokio;

use crate::discord_builder::{self, Client};

static mut CLIENT: Option<Client> = None;
static mut DISCORD_PRESENT: bool = false;

pub async fn init() {
    unsafe {
        CLIENT = Some(discord_builder::make_client(ds::Subscriptions::empty()).await);
        DISCORD_PRESENT = CLIENT.is_some();

        let mut activity_events = CLIENT.as_ref().unwrap().wheel.activity();

        tokio::task::spawn(async move {
            while let Ok(ae) = activity_events.0.recv().await {
                tracing::info!(event = ?ae, "received activity event");
            }
        });

        set_rpc("Booting", "").await;
    }
}

pub async fn set_rpc(state: &str, detail: &str) {
    unsafe {
        if !DISCORD_PRESENT {
            tracing::warn!("Discord is not present, skipping RPC update");
            return;
        }

        let mut activity = ds::activity::ActivityBuilder::default();

        if detail != "" {
            activity = activity.details(&detail.to_owned());
        }

        if state != "" {
            activity = activity.state(&state.to_owned());
        }

        let mut assets = ds::activity::Assets::default();
        assets = assets.large("lki".to_owned(), Some("Coda Gaming™️".to_owned()));

        activity = activity.assets(assets);

        /*activity = activity.buttons(vec![
            activity::Button::new("Launch Coda", "https://bit.ly/3CA1ARz"),
            activity::Button::new("Visit Deveden", "https://deveden.co"),
        ]);*/

        activity = activity.start_timestamp(SystemTime::now());

        activity = activity.party(
            "ae488379-351d-4a4f-ad32-2b9b01c91657",
            Some(NonZeroU32::new(1).unwrap()),
            Some(NonZeroU32::new(4).unwrap()),
            ds::activity::PartyPrivacy::Private,
        );
        activity = activity.secrets(Secrets {
            join: Some("somenicesecret=".to_owned()),
            spectate: None,
            r#match: None,
        });

        tracing::info!(
            "updated activity: {:?}",
            CLIENT
                .as_mut()
                .unwrap()
                .discord
                .update_activity(activity)
                .await
        );
    }
}
