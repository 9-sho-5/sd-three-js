import * as THREE from "three";

const windowWidth = window.outerWidth;
const windowHeight = window.innerHeight;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas"),
  antialias: true,
  devicePixelRatio: window.devicePixelRatio,
});
renderer.setSize(windowWidth, windowHeight);

// シーンを作成
const scene = new THREE.Scene();

// フォグを設定
scene.fog = new THREE.Fog(0x000000, 50, 2000);

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight);
camera.position.set(0, 0, +1000);

// グループを作成
const group = new THREE.Group();
scene.add(group);
const geometry = new THREE.BoxGeometry(50, 50, 50);

// ここでデフォルトの色を指定（例：赤色）
for (let i = 0; i < 1000; i++) {
  const material = new THREE.MeshStandardMaterial({ color: 0xff22ff }); // 各キューブに独自のマテリアルを作成
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 2000;
  mesh.position.y = (Math.random() - 0.5) * 2000;
  mesh.position.z = (Math.random() - 0.5) * 2000;
  mesh.rotation.x = Math.random() * 2 * Math.PI;
  mesh.rotation.y = Math.random() * 2 * Math.PI;
  mesh.rotation.z = Math.random() * 2 * Math.PI;
  // グループに格納する
  group.add(mesh);
}

// 光源
scene.add(new THREE.DirectionalLight(0xff0000, 2)); // 平行光源
scene.add(new THREE.AmbientLight(0x00ffff)); // 環境光源

// クリックイベント時にキューブの色を変更する関数
function onScreenClick() {
  // グループ内のすべてのメッシュの色をランダムに変更
  group.children.forEach((mesh) => {
    if (mesh instanceof THREE.Mesh) {
      mesh.material.color.set(Math.random() * 0xffffff); // ランダムな色に変更
    }
  });
}

// 毎フレーム時に実行されるループイベントです
function tick() {
  // グループを回す
  group.rotateY(0.01);
  renderer.render(scene, camera); // レンダリング
  requestAnimationFrame(tick);
}

// 画面クリック時に色を変更
window.addEventListener("click", onScreenClick);

// アニメーション開始
tick();
