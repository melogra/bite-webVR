import {
  Scene,
  SphereGeometry,
  Mesh,
  PerspectiveCamera,
  MeshBasicMaterial,
  TextureLoader,
  WebGLRenderer,
} from 'three'

import { WEBVR } from 'three/examples/jsm/vr/WebVR'

let scene
let camera
let renderer
let textureLoader
let viewer

const images = [
  '06.jpg'
]

const container = document.getElementById('app')

function init() {
  scene = new Scene()
  camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
  textureLoader = new TextureLoader()

  const viewerGeometry = new SphereGeometry(500, 40, 60)
  viewerGeometry.scale(-1, 1, 1)
  const viewerMaterial = new MeshBasicMaterial({
    map: textureLoader.load(images[0])
  })
  viewer = new Mesh(viewerGeometry, viewerMaterial)
  viewer.rotation.y = -Math.PI / 2
  scene.add(viewer)

  renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // webvr button
  container.appendChild(WEBVR.createButton(renderer))
  renderer.vr.enabled = true

  container.appendChild(renderer.domElement)
  window.addEventListener('resize', onWindowResize, false)
}

function animate() {

  renderer.render(scene, camera)

  // window.requestAnimationFrame(animate)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

init()
// animate()
renderer.setAnimationLoop(animate)
