import * as THREE from '../three/r120/build/three.module.js' ;

import PRIMS3D from './prims3d.js' ; 

import ControleurCamera from './controleurCamera.js' ; 

function Simu (){

    const that = this ; 

    this.scene = new THREE.Scene() ; 

	this.renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	this.camera = new THREE.PerspectiveCamera(45.0, window.innerWidth/window.innerHeight, 0.1, 100.0) ; 
	this.camera.position.set(0,1.7,10.0) ; 
	this.camera.lookAt(new THREE.Vector3(0.0,1.7,0.0)) ;
	this.scene.add(this.camera) ;   
			
	const balle = new THREE.Mesh(new THREE.SphereGeometry(0.005), new THREE.MeshNormalMaterial()) ; 
	balle.position.set(0.0,0,-0.5) ; 
	this.camera.add(balle) ; 
			

	const reticule = PRIMS3D.reticule() ;
    	this.camera.add( reticule );

	this.controleur = new ControleurCamera(this,this.camera) ;
         

	this.listener = new THREE.AudioListener() ; 
	this.camera.add(this.listener) ;

            
	window.addEventListener('resize', function(){
		that.windowHalfX = window.innerWidth  / 2.0 ; 
		that.windowHalfY = window.innerHeight / 2.0 ; 
		that.camera.aspect = window.innerWidth / window.innerHeight ;
		that.camera.updateProjectionMatrix() ; 
		that.renderer.setSize(window.innerWidth , window.innerHeight) ; 
				
	}) ; 

    	this.horloge = 0.0 ; 
	this.chrono  = new THREE.Clock() ; 

	this.scene.add(new THREE.GridHelper(100,10)) ; 
	this.scene.add(new THREE.AxesHelper(5)) ; 

    this.agents       = [] ; 
    this.perceptibles = [] ; 
}








Simu.prototype.debutAnimation = function(){
            this.chrono.start() ; 
            this.animation() ; 
}

Simu.prototype.animation = function(){
            const dt = this.chrono.getDelta() ; 
            this.horloge += dt ; 
            
            this.controleur.update(dt) ; 
            const that = this ; 
            requestAnimationFrame(() => {that.animation();}) ; 
            
            // Animation du monde
            
            this.agents.forEach(
            	(ag) => {
            			ag.composants.forEach((c) => {c.application(dt);}) ; 
            		}
            ) ; 
            
            this.agents.forEach(
            	(ag) => {
            			ag.actualisation(dt);
            		}
            ) ; 
	    
            this.renderer.render(this.scene, this.camera) ; 
}


Simu.prototype.ajoutAgent = function(a){
    this.agents.push(a) ; 
}

Simu.prototype.ajoutPerceptible = function(a){
    this.perceptibles.push(a) ; 
}



export default Simu ; 


