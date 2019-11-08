import Cookies from 'js-cookie'
import { RTCPeerConnection } from 'isomorphic-webrtc'

const peerConnection = new RTCPeerConnection()
const offer = Cookies.getJSON('offer')
peerConnection.setRemoteDescription(offer)
peerConnection.onicecandidate = e => {
  Cookies.set('answer', peerConnection.localDescription)
}
peerConnection.ontrack = e => {
  document.getElementById('audio').srcObject = e.streams[0]
}

;(async () => {
  const answer = await peerConnection.createAnswer()
  peerConnection.setLocalDescription(answer)
})()
