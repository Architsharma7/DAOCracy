import * as PushAPI from "@pushprotocol/restapi"
import * as ethers from "ethers"

const PK = "0a2dd06d0166ff18af2128ce2c303ff7388a98acddb9b34581720348baeff643" // channel private key
const Pkey = `0x737aa51e6c9641e204beb3032697d8c168602fae1cb71f39500d0406f350b983`
const signer = new ethers.Wallet(Pkey)

export const sendNotification = async () => {
  try {
    console.log("Started...")
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `test karte hai aur ek baar`,
        body: `I think ab chal raha hai--`,
      },
      payload: {
        title: `test karte hai 1-2-3-4`,
        body: `I think ab chal raha hai`,
        cta: "",
        img: "",
      },
      recipients: `eip155:5:0x313DFCb968BE590458B4e9Fa120DD4b333FD034B`, // recipient address
      channel: "eip155:5:0xB752a817Afac79f6a14634a9f828beD934c36Ef7", // your channel address
      env: "staging",
    })

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse)
  } catch (err) {
    console.error("Error: ", err)
  }
}

sendNotification()
