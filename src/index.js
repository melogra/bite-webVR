import {
  Scene,
  SphereGeometry,
  Mesh,
  PerspectiveCamera,
  MeshBasicMaterial,
  TextureLoader,
  Clock,
  WebGLRenderer,
  WebVRManager,
} from 'three'

let scene
let camera
let renderer
let textureLoader
let viewer

const images = [
  '06.jpg'
]

const container = document.getElementById('app')
const clock = new Clock()

function init() {
  scene = new Scene()
  camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
  textureLoader = new TextureLoader()

  // 图片选择器网格
  const viewerGeometry = new SphereGeometry(500, 40, 60)
  viewerGeometry.scale(-1, 1, 1)
  const viewerMaterial = new MeshBasicMaterial({
    map: textureLoader.load(images[0])
  })
  viewer = new Mesh(viewerGeometry, viewerMaterial)
  viewer.rotation.y = -Math.PI / 2
  scene.add(viewer)

  // renderer
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  container.appendChild(renderer.domElement)

  window.addEventListener('resize', onWindowResize, false)
}

function animate() {
  let delta = clock.getDelta() * 60

  renderer.render(scene, camera)

  window.requestAnimationFrame(animate)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

init()
animate()
