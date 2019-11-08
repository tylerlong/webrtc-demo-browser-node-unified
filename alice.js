import { RTCPeerConnection } from 'isomorphic-webrtc'
import Cookies from 'js-cookie'

const peerConnection = new RTCPeerConnection()

;(async () => {
  const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  const track = audioStream.getAudioTracks()[0]
  peerConnection.addTrack(track, audioStream)
  const offer = await peerConnection.createOffer()
  peerConnection.setLocalDescription(offer)
  Cookies.set('offer', peerConnection.localDescription)
  Cookies.remove('answer')
  const interval = setInterval(() => {
    const answer = Cookies.getJSON('answer')
    if (answer) {
      clearInterval(interval)
      peerConnection.setRemoteDescription(answer)
    }
  }, 1000)
})()
