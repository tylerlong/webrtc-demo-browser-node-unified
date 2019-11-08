import { RTCPeerConnection, mediaDevices } from 'isomorphic-webrtc'
import SIP from 'isomorphic-mock-sip-server'

const peerConnection = new RTCPeerConnection()

;(async () => {
  const audioStream = await mediaDevices.getUserMedia({ audio: true, video: false })
  const track = audioStream.getAudioTracks()[0]
  peerConnection.addTrack(track, audioStream)
  const offer = await peerConnection.createOffer()
  peerConnection.setLocalDescription(offer)
  SIP.set('offer', peerConnection.localDescription)
  SIP.remove('answer') // remove data from last run
  const interval = setInterval(() => {
    const answer = SIP.get('answer')
    if (answer) {
      clearInterval(interval)
      peerConnection.setRemoteDescription(answer)
    }
  }, 1000)
})()
