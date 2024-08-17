extern crate rabe;
extern crate reqwest;
extern crate serde_json;
extern crate tokio;

use dotenv::dotenv;
use rabe::schemes::bsw;
use serde_json::json;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    // generating public key and master secret key
    let (pk, msk) = bsw::setup();
    let pk_json = serde_json::to_string(&pk)?;
    let msk_json = serde_json::to_string(&msk)?;
    let payload = json!({
        "public_key": pk_json,
        "master_secret_key": msk_json,
    });

    let supabase_url = env::var("SUPABASE_URL").expect("SUPABASE_URL must be set");
    let supabase_api_key = env::var("SUPABASE_API_KEY").expect("SUPABASE_API_KEY must be set");

    let endpoint = format!("{}/rest/v1/keys", supabase_url);

    let client = reqwest::Client::new();
    let response = client
        .post(&endpoint)
        .header("apikey", &supabase_api_key)
        .header("Authorization", format!("Bearer {}", supabase_api_key))
        .header("Content-Type", "application/json")
        .json(&payload)
        .send()
        .await?;

    if response.status().is_success() {
        println!("Keys have been stored in Supabase!");
    } else {
        let status = response.status();
        let error_text = response.text().await?;
        eprintln!(
            "Failed to store keys. Status: {}. Error: {}",
            status, error_text
        );
    }

    Ok(())
}
