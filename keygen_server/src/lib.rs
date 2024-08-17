extern crate rabe;
extern crate serde_json;
use rabe::schemes::bsw;
use rabe::schemes::bsw::CpAbePublicKey;
use rabe::utils::policy::pest::PolicyLanguage;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn generate_public_key() -> Result<String, JsValue> {
    let (pk, _msk) = bsw::setup();
    let pk_json = serde_json::to_string(&pk).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(pk_json)
}

#[wasm_bindgen]
pub fn encrypt(
    pk_json: &str,
    policy: &str,
    plaintext: &[u8],
) -> Result<String, JsValue> {
    let pk: CpAbePublicKey =
        serde_json::from_str(pk_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let ct = bsw::encrypt(&pk, policy, PolicyLanguage::HumanPolicy, plaintext)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let ct_json = serde_json::to_string(&ct).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(ct_json)
}
