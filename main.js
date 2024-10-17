import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js';
import { degToRad } from 'three/src/math/MathUtils.js';

let screenOn = true
let infoBoxSelection = ''

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 500
camera.position.y = 300

const htmlRenderer3D = new CSS3DRenderer({ PointerEvent: true })
htmlRenderer3D.setSize(window.innerWidth, window.innerHeight)
htmlRenderer3D.domElement.style.position = 'absolute'
htmlRenderer3D.domElement.style.top = 0
document.body.appendChild(htmlRenderer3D.domElement)


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)




const htmlRenderer = new CSS2DRenderer()
htmlRenderer.setSize(150, 400)
htmlRenderer.domElement.style.position = 'absolute'
htmlRenderer.domElement.style.top = 0
document.body.appendChild(htmlRenderer.domElement)

const SO = document.createElement('div')
const display = document.createElement('iframe')


SO.appendChild(display)

display.src = "SO.html"
display.style.width = '200px'
display.style.height = '135px'

const cssObject = new CSS3DObject(display)
cssObject.position.set(-0.16 * 100, 1.95 * 100, 0.68 * 100)
scene.add(cssObject)

// information boxs

const infoBox = document.createElement('div')
infoBox.style.backgroundColor = 'white'
infoBox.style.maxWidth = '400px'
infoBox.style.border = '1px solid black'
infoBox.style.textAlign = 'center'
infoBox.style.margin = '5px'
infoBox.style.color = 'black'
infoBox.style.userSelect = 'none'
infoBox.style.borderRadius = '10px'
infoBox.textContent = 'Informacion'

const cssInfoBox = new CSS3DObject(infoBox)
cssInfoBox.position.set(-0.16 * 100, 1.95 * 100, 0.68 * 100)

function updateInfoBox() {
  const data = {
    Todo : {
      title : 'Sistema Operativo vs. Hardware',
      description : `
  <p><strong>Sistema Operativo:</strong> El software que gestiona el hardware y proporciona una interfaz para el usuario. Es como el conductor de un coche.</p>
  <p><strong>Hardware:</strong> Las partes físicas de un ordenador, como el procesador, la memoria RAM y el disco duro. Son las herramientas con las que trabaja el sistema operativo.</p>`,
      position : { x : 0, y : 4.5, z : 0 },
      rotation : { x : 0, y : 0, z : 0 }
    
},
    CPU : {
      title : 'CPU',
      description : '<h3>Hardware de Procesamiento:</h3> <p>El núcleo de la computadora, responsable de realizar operaciones lógicas y cálculos. Incluye la Unidad Central de Proceso (CPU) y la placa madre, que conecta todos los componentes.</p>',
      position : { x : 2, y : 2, z : 0 },
      rotation : { x : 0, y : 0, z : 0 }
    },
    Fuente : {
      title : 'Fuente',
      description : '<h3>Fuente de Energía:</h3> <p>Transforma la corriente eléctrica alterna en corriente continua para alimentar los dispositivos internos de la computadora y distribuye el voltaje necesario.</p>',
      position : { x : -2.5, y : 0, z : -3 },
      rotation : { x : 0, y : 0, z : 0 }
    },
    Ram : {
      title : 'Ram',
      description : '<h3>Hardware de Almacenamiento:</h3> <p>La memoria del sistema, que permite guardar información en soportes internos y extraíbles. El principal componente de este tipo es la memoria RAM (memoria de acceso aleatorio).</p>',
      position : { x : 0, y : 2, z : 3 },
      rotation : { x : 0, y : 90, z : 0 }
    },
    Almacenamiento : {
      title : 'Almacenamiento',
      description : '<h3>Hardware de Entrada y Salida:</h3> <p>Dispositivos que combinan las funciones de entrada y salida de información del sistema, como los discos duros y las memorias USB.</p>',
      position : { x : 0, y : 0, z : 0 },
      rotation : { x : 0, y : 0, z : 0}
    }
  }
  if (infoBoxSelection === 'Cerrar') {
    cssInfoBox.visible = false
    return
  } else {
    cssInfoBox.visible = true
  }

  if (screenOn){
    cssInfoBox.visible = false
    return
  }

  const DataString = `<h2>${data[infoBoxSelection].title}</h2> \n <p>${data[infoBoxSelection].description}</p>`

  infoBox.innerHTML = DataString
  cssInfoBox.position.set(data[infoBoxSelection].position.x * 100, data[infoBoxSelection].position.y * 100, data[infoBoxSelection].position.z * 100)
  cssInfoBox.rotation.set(degToRad(data[infoBoxSelection].rotation.x), degToRad(data[infoBoxSelection].rotation.y), degToRad(data[infoBoxSelection].rotation.z))
}

scene.add(cssInfoBox)


// add selection box to the css renderer
const selectionBox = document.createElement('div')
selectionBox.style.display = 'flex'
selectionBox.style.justifyContent = 'center'
selectionBox.style.alignItems = 'center'
selectionBox.style.flexDirection = 'column'
selectionBox.style.position = 'absolute'

function toggleAnimation(cindex) {
  if (cindex === -3) {
    ToggleScreen()
    return
  }
  if (cindex === -2) {
    if (mixer) {
      screenmixer.clipAction(screenclips[1]).play()
      screenmixer.clipAction(screenclips[1]).setLoop(THREE.LoopOnce)
      screenmixer.clipAction(screenclips[1]).clampWhenFinished = true
      clips.forEach((clip) => {
        mixer.clipAction(clip).play()
        mixer.clipAction(clip).setLoop(THREE.LoopOnce)
        mixer.clipAction(clip).clampWhenFinished = true
      })
    }
    return
  }
  if (cindex === -1) {
    if (mixer) {
      mixer.stopAllAction()
      screenmixer.stopAllAction()
    }
    return
  }
  if (mixer && screenmixer) {
    if (mixer.clipAction(clips[cindex]).time === 0) {
      screenmixer.clipAction(screenclips[1]).play()
      screenmixer.clipAction(screenclips[1]).setLoop(THREE.LoopOnce)
      screenmixer.clipAction(screenclips[1]).clampWhenFinished = true
      mixer.clipAction(clips[0]).play()
      mixer.clipAction(clips[0]).setLoop(THREE.LoopOnce)
      mixer.clipAction(clips[0]).clampWhenFinished = true
      mixer.clipAction(clips[cindex]).play()
      mixer.clipAction(clips[cindex]).setLoop(THREE.LoopOnce)
      mixer.clipAction(clips[cindex]).clampWhenFinished = true
    }else{
      mixer.clipAction(clips[cindex]).stop()
    }
  }
}

function createOption(name, index) {
  const option = document.createElement('div')
  option.style.width = '100%'
  option.style.height = '50px'
  option.style.backgroundColor = 'white'
  option.style.border = '1px solid black'
  option.style.textAlign = 'center'
  option.style.margin = '5px'
  option.style.cursor = 'pointer'
  option.textContent = name
  option.style.userSelect = 'none'
  option.style.color = 'black'

  option.addEventListener('click', () => {
    if (screenOn) {
      ToggleScreen(false)
    }
    toggleAnimation(index)

    infoBoxSelection = name
    updateInfoBox()

  })

  selectionBox.appendChild(option)
}

createOption('Todo', -2)
createOption('Cerrar', -1)
createOption('CPU', 1)
createOption('Fuente' , 4)
createOption('Ram' , 2)
createOption('Almacenamiento' , 3)
createOption('Encender', -3)

htmlRenderer.domElement.appendChild(selectionBox)

let light = new THREE.AmbientLight(0xffffff, 5)
scene.add(light)

let pcmodel, mixer, clips

const loader = new GLTFLoader()
loader.load('/models/IBMPC.glb', function (gltf) {
  pcmodel = gltf
  pcmodel.scene.scale.set(100, 100, 100)
  pcmodel.scene.rotation.y = Math.PI
  scene.add(pcmodel.scene)

  // Create an AnimationMixer, and get the list of AnimationClips
  mixer = new THREE.AnimationMixer(pcmodel.scene)
  clips = pcmodel.animations
})

let screenmodel, screenmixer, screenclips

loader.load('/models/IBMScreen.glb', function (gltf) {
  screenmodel = gltf
  screenmodel.scene.scale.set(100, 100, 100)
  screenmodel.scene.rotation.y = Math.PI
  screenmodel.scene.position.y = 0.9 * 100
  screenmodel.scene.position.z = -0.5 * 100
  scene.add(screenmodel.scene)
  
  screenmixer = new THREE.AnimationMixer(screenmodel.scene)
  screenclips = screenmodel.animations

})

const controls = new OrbitControls(camera, htmlRenderer3D.domElement)
controls.enableZoom = false

const clock = new THREE.Clock()

document.addEventListener('keydown', (event) => {
  if (event.key === 's') {
    ToggleScreen()
  }
})

function ToggleScreen(value) {
  mixer.stopAllAction()
  screenmixer.stopAllAction()

  if (value !== undefined) {
    if (value) {
      controls.reset()
    }
    screenOn = value
    return
  }

  if (!screenOn) {
    controls.reset()
  }

  screenOn = !screenOn
  return
}

const animate = function () {
  requestAnimationFrame(animate)

  cssObject.visible = screenOn

  if (screenOn) {
    controls.maxPolarAngle = Math.PI / 2
    controls.minPolarAngle = 0.8
    controls.enableRotate = true
    controls.maxAzimuthAngle = Math.PI / 4.5 // Limit horizontal rotation to 90 degrees
    controls.minAzimuthAngle = -Math.PI / 4.5 // Limit horizontal rotation to -90 degrees
    controls.enableZoom = false
    controls.maxZoom = 1
    controls.enablePan = false
  } else {
    controls.maxPolarAngle = Math.PI
    controls.minPolarAngle = 0
    controls.enableRotate = true
    controls.maxAzimuthAngle = Infinity
    controls.minAzimuthAngle = -Infinity
    controls.enableZoom = true
    controls.enablePan = true
  }

  if (mixer && screenmixer) {
    const delta = clock.getDelta()
    mixer.update(delta)
    screenmixer.update(delta)    
  }
  htmlRenderer3D.render(scene, camera)
  htmlRenderer.render(scene, camera)
  renderer.render(scene, camera)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  htmlRenderer3D.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize)

animate()
updateInfoBox()