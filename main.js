// Initialize Three.js components
let scene, camera, renderer;
let objectGroup; // Group to hold all objects

// Set up the environment
function init() {
    // Create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Light gray background
    
    // Set up the camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a group to hold all objects
    objectGroup = new THREE.Group();

    // Create the wireframe cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x000000,
        wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    objectGroup.add(cube);

    // Create blue sphere
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const blueSphere = new THREE.Mesh(sphereGeometry, blueMaterial);
    blueSphere.position.set(0, 1.5, 0);
    objectGroup.add(blueSphere);

    // Create red sphere
    const redMaterial = new THREE.MeshBasicMaterial({ color: 0x800000 });
    const redSphere = new THREE.Mesh(sphereGeometry, redMaterial);
    redSphere.position.set(1.5, 0, 0);
    objectGroup.add(redSphere);

    // Create vertical line
    const verticalLineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, -2, 0)
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const verticalLine = new THREE.Line(verticalLineGeometry, lineMaterial);
    objectGroup.add(verticalLine);

    // Create horizontal line
    const horizontalLineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(2, 0, 0)
    ]);
    const horizontalLine = new THREE.Line(horizontalLineGeometry, lineMaterial);
    objectGroup.add(horizontalLine);

    // Add the group to the scene
    scene.add(objectGroup);

    // Adjust camera position for better view
    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the entire group
    objectGroup.rotation.x += 0.01;
    objectGroup.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add event listener for window resize
window.addEventListener('resize', onWindowResize, false);

// Initialize the scene and start the animation
init();
animate(); 