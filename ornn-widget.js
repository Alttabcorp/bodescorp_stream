// ========================================
// WIDGET 3D ORNN - VERSÃO MINIMALISTA
// ========================================

class OrnnWidget {
    constructor() {
        this.container = document.getElementById('ornn3DContainer');
        this.toggleBtn = document.getElementById('ornnWidgetToggle');
        this.widget = document.getElementById('ornnWidget');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.mixer = null;
        this.clock = null;
        this.animations = [];
        this.currentAnimation = null;
        this.isVisible = true;
        this.idleAnimationIndex = 34; // Índice da animação idle padrão (ajuste aqui)
        
        this.init();
    }
    
    async init() {
        if (!this.container) return;
        
        // Carregar Three.js
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
        const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
        
        this.THREE = THREE;
        
        // Setup da cena
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        
        // Câmera - Afastada para ver o modelo completo
        const width = this.container.clientWidth || 200;
        const height = this.container.clientHeight || 200;
        this.camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
        this.camera.position.set(-176.636, 84.696, -110.620); // Posição ajustada manualmente
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);
        
        // Controles
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true; // Habilitar zoom para ajustar
        this.controls.enablePan = true; // Habilitar pan para ajustar
        this.controls.autoRotate = false; // Sem rotação automática
        this.controls.autoRotateSpeed = 0;
        this.controls.target.set(0, 0.3, 0); // Target conforme ajuste manual
        
        // Iluminação
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(directionalLight);
        
        const fillLight = new THREE.DirectionalLight(0xffa500, 0.5);
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);
        
        // Carregar modelo
        const loader = new GLTFLoader();
        try {
            const gltf = await new Promise((resolve, reject) => {
                loader.load(
                    'assets/ornn.glb',
                    resolve,
                    undefined,
                    reject
                );
            });
            
            this.model = gltf.scene;
            
            // Reduzir escala do modelo para caber no widget
            this.model.scale.set(0.3, 0.3, 0.3);
            
            // Ajustar posição baseado no tamanho da tela
            const isMobile = width < 180;
            const posY = isMobile ? -1.3 : -30.5;
            this.model.position.set(0, posY, 0);
            this.model.rotation.y = (230 * Math.PI) / 180; // 190 graus
            this.scene.add(this.model);
            
            // Setup de animações
            if (gltf.animations && gltf.animations.length > 0) {
                this.mixer = new THREE.AnimationMixer(this.model);
                this.animations = gltf.animations;
                
                // Tocar animação idle configurada
                if (this.animations[this.idleAnimationIndex]) {
                    const action = this.mixer.clipAction(this.animations[this.idleAnimationIndex]);
                    action.play();
                    this.currentAnimation = action;
                }
            }
            
            // Remover loading
            const loading = this.container.querySelector('.ornn-loading');
            if (loading) loading.remove();
            
        } catch (error) {
            console.error('Erro ao carregar Ornn:', error);
            this.container.innerHTML = '<div class="ornn-error">❌</div>';
        }
        
        // Event listeners
        this.setupEventListeners();
        
        // Iniciar animação
        this.animate();
    }
    
    setupEventListeners() {
        // Toggle visibilidade
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => {
                this.isVisible = !this.isVisible;
                this.widget.classList.toggle('hidden');
            });
        }
        
        // Clique no modelo para animação aleatória
        if (this.renderer) {
            this.renderer.domElement.addEventListener('click', () => {
                this.playRandomAnimation();
            });
        }
    }
    
    playRandomAnimation() {
        if (!this.mixer || !this.animations.length) return;
        
        const randomIndex = Math.floor(Math.random() * this.animations.length);
        const newAction = this.mixer.clipAction(this.animations[randomIndex]);
        
        if (this.currentAnimation) {
            this.currentAnimation.fadeOut(0.5);
        }
        
        newAction.reset();
        newAction.fadeIn(0.5);
        newAction.setLoop(this.THREE.LoopOnce);
        newAction.clampWhenFinished = true;
        newAction.play();
        
        this.currentAnimation = newAction;
        
        // Voltar para idle após animação
        setTimeout(() => {
            if (this.animations[this.idleAnimationIndex]) {
                const idleAction = this.mixer.clipAction(this.animations[this.idleAnimationIndex]);
                newAction.fadeOut(0.5);
                idleAction.reset();
                idleAction.fadeIn(0.5);
                idleAction.play();
                this.currentAnimation = idleAction;
            }
        }, newAction.getClip().duration * 1000);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        
        if (this.mixer) {
            this.mixer.update(delta);
        }
        
        if (this.controls) {
            this.controls.update();
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Inicializar widget quando página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => new OrnnWidget(), 1000);
    });
} else {
    setTimeout(() => new OrnnWidget(), 1000);
}
