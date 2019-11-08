import { RTCPeerConnection, RTCSessionDescription } from 'isomorphic-webrtc'
import Cookies from 'js-cookie'

Cookies.remove('answer')

const peerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
})

;(async () => {
  const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  const track = audioStream.getAudioTracks()[0]
  peerConnection.addTrack(track, audioStream)
  const offer = await peerConnection.createOffer()
  peerConnection.setLocalDescription(offer)
  console.log(offer)
  Cookies.set('offer', peerConnection.localDescription)

  const interval = setInterval(() => {
    const answer = Cookies.getJSON('answer')
    if (answer) {
      console.log(new RTCSessionDescription(answer))
      clearInterval(interval)
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
    }
  }, 1000)
})()
