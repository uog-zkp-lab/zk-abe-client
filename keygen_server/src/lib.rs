use js_sys::Uint8Array;
use rabe;
use rabe::schemes::bsw::{self, CpAbeCiphertext, CpAbeMasterKey, CpAbePublicKey, CpAbeSecretKey};
use rabe::utils::policy::pest::PolicyLanguage;
use serde_json;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn setup() -> Result<JsValue, JsValue> {
    let (pk, msk) = bsw::setup();

    let pk_json = serde_json::to_string(&pk).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let msk_json = serde_json::to_string(&msk).map_err(|e| JsValue::from_str(&e.to_string()))?;

    let result = js_sys::Array::of2(&JsValue::from_str(&pk_json), &JsValue::from_str(&msk_json));
    Ok(JsValue::from(result))
}

#[wasm_bindgen]
pub fn generate_public_key() -> Result<String, JsValue> {
    let (pk, _msk) = bsw::setup();
    let pk_json = serde_json::to_string(&pk).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(pk_json)
}

#[wasm_bindgen]
pub fn encrypt(pk_json: &str, policy: &str, plaintext: &[u8]) -> Result<String, JsValue> {
    let pk: CpAbePublicKey =
        serde_json::from_str(pk_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let ct = bsw::encrypt(&pk, policy, PolicyLanguage::HumanPolicy, plaintext)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let ct_json = serde_json::to_string(&ct).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(ct_json)
}

#[wasm_bindgen]
pub fn keygen(pk_json: &str, msk_json: &str, pol_json: &str) -> Result<String, JsValue> {
    let pk: CpAbePublicKey =
        serde_json::from_str(pk_json).map_err(|e| JsValue::from_str(&e.to_string()))?;

    let msk: CpAbeMasterKey =
        serde_json::from_str(msk_json).map_err(|e| JsValue::from_str(&e.to_string()))?;

    let pol_vec: Vec<String> =
        serde_json::from_str(pol_json).map_err(|e| JsValue::from_str(&e.to_string()))?;

    let pol_slice: Vec<&str> = pol_vec.iter().map(|s| s.as_str()).collect();

    let sk: CpAbeSecretKey = bsw::keygen(&pk, &msk, &pol_slice)
        .ok_or_else(|| JsValue::from_str("Key generation failed: SecretKey not generated"))?;

    serde_json::to_string(&sk).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn decrypt(sk_json: &str, ct_cp_json: &str) -> Result<Uint8Array, JsValue> {
    let sk: CpAbeSecretKey = serde_json::from_str(sk_json)
        .map_err(|e| JsValue::from_str(&format!("Error deserializing secret key: {:?}", e)))?;

    log("decrypting");

    let ct_cp: CpAbeCiphertext = serde_json::from_str(ct_cp_json)
        .map_err(|e| JsValue::from_str(&format!("Error deserializing ciphertext: {:?}", e)))?;

    log(&format!("Ciphertext: {:?}", ct_cp));

    let plaintext_bytes = bsw::decrypt(&sk, &ct_cp)
        .map_err(|e| JsValue::from_str(&format!("Decryption error: {:?}", e)))?;

    Ok(Uint8Array::from(&plaintext_bytes[..]))
}
