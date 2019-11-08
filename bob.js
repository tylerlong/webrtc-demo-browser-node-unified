import SIP from 'isomorphic-mock-sip-server'
import { RTCPeerConnection } from 'isomorphic-webrtc'

const peerConnection = new RTCPeerConnection()
const offer = SIP.get('offer')
peerConnection.setRemoteDescription(offer)
peerConnection.onicecandidate = e => {
  SIP.set('answer', peerConnection.localDescription)
}
peerConnection.ontrack = e => {
  const audio = document.createElement('audio')
  audio.autoplay = true
  audio.controls = true
  document.body.appendChild(audio)
  audio.srcObject = e.streams[0]
}

;(async () => {
  const answer = await peerConnection.createAnswer()
  peerConnection.setLocalDescription(answer)
})()
