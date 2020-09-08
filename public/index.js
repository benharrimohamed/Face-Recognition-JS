const videoCam = document.getElementById('video')
const canvasElement = document.getElementById('canvas')

const natural = document.getElementById('natural')
const happy = document.getElementById('happy')
const sad = document.getElementById('sad')
const angry = document.getElementById('angry')
const surprised = document.getElementById('surprised')
const gender = document.getElementById('gender')
const genderPer = document.getElementById('genderPer')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/weights'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
  faceapi.nets.faceExpressionNet.loadFromUri('/weights'),
  faceapi.nets.ageGenderNet.loadFromUri('/weights'),
]).then(OpenWebCam)



function OpenWebCam ()
{
   navigator.getUserMedia (
     {video : {}},
     stream => videoCam.srcObject = stream,
     err => console.error(err)
      )

}
 

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  canvasElement.append(canvas)
  const displaySize = { width: video.width, height: video.height }

  var width_natural;
  var width_happy;
  var width_sad;
  var width_angry;
  var width_surprised;

  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = 
    await faceapi.detectSingleFace(video, new faceapi.
      TinyFaceDetectorOptions()).
        withFaceLandmarks().
        withFaceExpressions().
        withAgeAndGender()

    var naturalPer = parseInt(((detections.expressions.neutral)*100))
    var happyPer = parseInt(((detections.expressions.happy)*100))
    var sadPer = parseInt(((detections.expressions.sad)*100))
    var angryPer = parseInt(((detections.expressions.angry)*100))
    var surprisedPer = parseInt(((detections.expressions.surprised)*100))
    var genderRec = detections.gender
    var genderPro = detections.genderProbability
 
   

    width_natural='width :'+naturalPer+'%'
    width_happy='width :'+happyPer+'%'
    width_sad='width :'+sadPer+'%'
    width_angry='width :'+angryPer+'%'
    width_surprised='width :'+surprisedPer+'%'

    natural.setAttribute('style',width_natural)
    natural.innerHTML = naturalPer+'%'

    happy.setAttribute('style',width_happy)
    happy.innerHTML = happyPer+'%'

    sad.setAttribute('style',width_sad)
    sad.innerHTML = sadPer+'%'

    angry.setAttribute('style',width_angry)
    angry.innerHTML = angryPer+'%'

    surprised.setAttribute('style',width_surprised)
    surprised.innerHTML = surprisedPer+'%'

    gender.innerHTML = genderRec
    genderPer.innerHTML = parseInt(genderPro*100)+"%"

    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections) 
    
  }, 100)
})
