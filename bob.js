import SIP from 'isomorphic-mock-sip-server'
import { RTCPeerConnection } from 'isomorphic-webrtc'
import player from 'isomorphic-audio-player'

const peerConnection = new RTCPeerConnection()
const offer = SIP.get('offer')
peerConnection.setRemoteDescription(offer)
peerConnection.onicecandidate = e => {
  SIP.set('answer', peerConnection.localDescription)
}
peerConnection.ontrack = e => {
  player.play(e)
}

;(async () => {
  const answer = await peerConnection.createAnswer()
  peerConnection.setLocalDescription(answer)
})()
