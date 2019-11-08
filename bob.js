import Cookies from 'js-cookie'
import { RTCPeerConnection, RTCSessionDescription } from 'isomorphic-webrtc'

const peerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
})
peerConnection.onicecandidate = e => {
  console.log('cookie set answer')
  Cookies.set('answer', peerConnection.localDescription)
}
peerConnection.ontrack = e => {
  console.log('track')
  console.log(e.streams.length)
  document.getElementById('audio').srcObject = e.streams[0]
}

const offer = Cookies.getJSON('offer')
console.log(new RTCSessionDescription(offer))
peerConnection.setRemoteDescription(new RTCSessionDescription(offer))

;(async () => {
  const answer = await peerConnection.createAnswer()
  peerConnection.setLocalDescription(answer)
})()
