
import * as THREE from '../three/r120/build/three.module.js' ;

function Agent(nom, oPars, simu){

	this.nom        = nom ; 
	this.simulateur = simu ;

	this.objet3d = new THREE.Group() ; 
	this.right   = new THREE.Vector3(0,0,0) ; 
	this.up      = new THREE.Vector3(0,0,0) ; 
	this.forward = new THREE.Vector3(0,0,0) ; 
	this.objet3d.matrix.extractBasis(this.right, this.up, this.forward) ; 
	

	this.simulateur.scene.add(this.objet3d) ; 
	this.composants = [] ; 
	this.data = {} ; 
} 

Agent.prototype.incarnation = function(fObj,oObj){
	const obj = fObj(this.nom, oObj) ; 
	this.objet3d.add(obj) ; 
}

Agent.prototype.placementEn = function(x,y,z){
    this.objet3d.position.set(x,y,z) ; 
}

Agent.prototype.orientationSelon = function(rx,ry,rz){
    this.objet3d.rotation.set(rx,ry,rz) ; 
    this.objet3d.matrix.extractBasis(this.right, this.up, this.forward) ;
} 

Agent.prototype.ajoutComposant = function(fComp, oPars){
	const comp = new fComp(oPars,this) ; 
	this.composants.push(comp) ; 
}

Agent.prototype.actualisation = function(dt){}

// ============================================================================================

function AgentDyn(nom, oPars,simu){
	Agent.call(this, nom, oPars, simu) ; 
	this.cible = new THREE.Vector3(0.0,0.0,0.0) ; 
	this.masse = oPars.masse || 1.0 ; 
	this.vMax  = oPars.vMax  || 300000000.0 ; 
	this.vitesse = new THREE.Vector3(0,0.0,0.0) ; 
	this.force = new THREE.Vector3(0.0,0.0,0.0) ; 
}

AgentDyn.prototype = Object.create(Agent.prototype) ; 
AgentDyn.prototype.constructor = AgentDyn ; 

AgentDyn.prototype.actualisation = function(dt){
	this.cible.copy(this.objet3d.position) ; 
	this.cible.add(this.vitesse) ; 
	this.objet3d.position.addScaledVector(this.vitesse, dt) ; 
	this.vitesse.addScaledVector(this.force, dt/this.masse) ; 
	this.vitesse.clampLength(0.0,this.vMax) ; 
	this.force.set(0.0,0.0,0.0) ; 
	
	if(this.vitesse.length() > 0.0001){
		this.objet3d.lookAt(this.cible) ; 
		this.objet3d.matrix.extractBasis(this.right, this.up, this.forward) ; 
	}
}

AgentDyn.prototype.applicationForce = function(f){
	this.force.add(f) ; 
}




const AGENTS = {agent:Agent, agentDyn:AgentDyn}

export default AGENTS ; 
