import { RTCPeerConnection } from 'isomorphic-webrtc'
import Cookies from 'js-cookie'

const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
})

;(async () => {
  const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  const track = audioStream.getAudioTracks()[0]
  peerConnection.addTrack(track, audioStream)
  const offer = await peerConnection.createOffer()
  peerConnection.setLocalDescription(offer)
  console.log(offer)
  Cookies.set('offer', offer)
})()
