import * as THREE from '../three/r120/build/three.module.js' ;





function Composant(oPars, agent){
	this.agent = agent ; 
}

Composant.prototype.application = function(dt){}

Composant.prototype.modificationData = function(nom,v0){
	this.agent.data[nom] = v0 ; 
}



// ==============================================================================

const COMPS = {composant:Composant}

function specialisation(nomUsage, constructeur, parent){
	COMPS[nomUsage] = constructeur ;
	constructeur.prototype = Object.create(parent.prototype) ; 
	constructeur.prototype.constructor = constructeur ;
}


// ==============================================================================

function COMPAlea(oPars, agent){
	Composant.call(this, oPars, agent) ; 
	this.dMax = oPars.dMax || 10.0 ; 
	this.vMax = oPars.vMax || 2.0 ; 
	this.alea = oPars.alea || 0.2 ; 
	this.Fs   = new THREE.Vector3(0.0,0.0,0.0) ; 
}

specialisation("compAlea", COMPAlea, Composant) ; 

COMPAlea.prototype.application = function(dt){

	if(!this.agent.data.cible){
		if(this.agent.objet3d.position.length() > this.dMax){
			this.Fs.copy(this.agent.objet3d.position) ; 
			this.Fs.normalize() ; 
			this.Fs.multiplyScalar(-4.0) ; 
		}
		else {

			this.Fs.copy(this.agent.forward) ; 

			this.Fs.multiplyScalar(this.vMax) ; 
			this.Fs.sub(this.agent.vitesse) ; 
			if(Math.random() < this.alea){
				const k = 0.5 - Math.random() ; 
				const ka = Math.abs(k) ; 

				if(ka > 0.000001)
					this.Fs.addScaledVector(this.agent.right, 5*k/ka) ; 
			}
		}
	}


	this.agent.applicationForce(this.Fs) ; 

}

// ==============================================================================

function COMPFrot(oPars, agent){
	Composant.call(this, oPars, agent) ; 
	this.force = new THREE.Vector3(0.0,0.0,0.0) ; 
	this.k     = oPars.k || 0.1 ;
}

specialisation("compFrot", COMPFrot, Composant) ; 


COMPFrot.prototype.application = function(dt){
	this.force.copy(this.agent.vitesse) ; 
	this.force.multiplyScalar(-this.k) ; 
	this.agent.applicationForce(this.force) ; 
	
}

// ==============================================================================

function COMPSeek(oPars, agent){
	Composant.call(this, oPars, agent) ; 
	
	this.Fs = new THREE.Vector3(0.0,0.0,0.0) ; 
}

specialisation("compSeek", COMPSeek, Composant) ; 

COMPSeek.prototype.application = function(dt){
	if(this.agent.data.cible){
		this.Fs.copy(this.agent.data.cible) ; 
		this.Fs.sub(this.agent.objet3d.position) ; 
		this.Fs.clampLength(0.0, this.agent.vMax) ; 
		this.Fs.sub(this.agent.vitesse) ; 
		this.agent.applicationForce(this.Fs) ; 
	}
}
// ==============================================================================

function COMPBoucle(oPars, agent){
    Composant.call(this, oPars, agent) ; 
    this.points = oPars.points || [] ; 
    this.d0     = oPars.d0     || 1 ;
    this.k = 0 ; 
    this.Fs = new THREE.Vector3(0.0,0.0,0.0) ; 
}

specialisation("compBoucle", COMPBoucle, Composant) ; 

COMPBoucle.prototype.application = function(dt){
    const n = this.points.length ; 
    if(n > 0){
        if((this.points[this.k]).distanceTo(this.agent.objet3d.position)<this.d0){
            this.k = (this.k + 1) % n ;
        }
       	this.Fs.copy(this.points[this.k]) ; 
		this.Fs.sub(this.agent.objet3d.position) ; 
		this.Fs.clampLength(0.0, this.agent.vMax) ; 
		this.Fs.sub(this.agent.vitesse) ; 
		this.agent.applicationForce(this.Fs) ;  
    }
}



// ===============================================================================

function COMPDesignationCible(oPars, agent){
	Composant.call(this,oPars,agent) ; 
	
}

specialisation("compDesignationCible", COMPDesignationCible, Composant) ; 

COMPDesignationCible.prototype.application = function(dt){
	this.agent.data.cible = new THREE.Vector3(5.0,0.0,10.0) ; 
}


// ===============================================================================

function COMPArrive(oPars, agent){
    Composant.call(this,oPars,agent) ; 
    this.d0 = new THREE.Vector3(3,3,3) ;
    this.Fs = new THREE.Vector3(0.0,0.0,0.0) ; 
}

specialisation("compArrive", COMPArrive, Composant) ; 

COMPArrive.prototype.application = function(dt){
	if(this.agent.data.cible){
		if(this.agent.objet3d.position){
			this.Fs.copy(this.agent.data.cible) ; 
			this.Fs.sub(this.agent.objet3d.position) ; 
			if(this.d0.x<this.Fs.x &&
				this.d0.z<this.Fs.z ){
				this.Fs.clampLength(0.0, this.agent.vMax) ; 
			this.Fs.sub(this.agent.vitesse) ; 
			this.agent.applicationForce(this.Fs) ; 
		}
		else{
			this.Fs.clampLength(0.0, 0.1) ; 
			this.Fs.sub(this.agent.vitesse) ; 
			this.agent.applicationForce(this.Fs) ; 
		}
	}
	}

}




// ==============================================================================

function COMPEvitement(oPars, agent){
    Composant.call(this,oPars,agent) ; 
}

specialisation("compEvitement", COMPEvitement, Composant) ; 

COMPEvitement.prototype.application = function(dt){}


// ==============================================================================


function COMPTest(oPars, agent){
	Composant.call(this, oPars, agent) ; 
	this.horloge = 0.0 ; 
}

specialisation("compTest", COMPTest, Composant) ; 

COMPTest.prototype.application = function(dt){
	this.horloge += dt ; 
	const x = 2*Math.cos(this.horloge) ; 
	const y = 0.0 ; 
	const z = 2*Math.sin(this.horloge) ; 
	this.agent.objet3d.position.set(x,y,z) ; 
}

// ==============================================================================


function COMPCapteur360(oPars,agent){
    Composant.call(this, oPars, agent) ; 
    this.horizon = oPars.horizon || 5.0 ; 
    if(! this.agent.data.percus)
        this.agent.data.percus = [] ; 
}

specialisation("compCapteur360", COMPCapteur360,Composant) ; 

COMPCapteur360.prototype.application = function(dt){
    const perceptibles = this.agent.simulateur.perceptibles ; 
    this.agent.data.percus = [] ; 
    perceptibles.forEach((a) => {if(this.agent.objet3d.position.distanceTo(a.objet3d.position)<this.horizon)
                                    this.agent.data.percus.push(a) ; 
                               }) ;
    this.agent.data.cible = null ; 
    if(this.agent.data.percus.length > 1){
		// console.log("VISIBLES : ", this.agent.data.percus[1].objet3d.position) ; 
        this.agent.data.cible = this.agent.data.percus[1].objet3d.position ; 
    } ;
   
    
}

// ==============================================================================

function COMPConeVision(oPars,agent){
    Composant.call(this, oPars,agent) ; 
    this.horizon   = oPars.horizon || 5.0 ; 
    this.demiAngle = (oPars.angle / 2.0) * Math.PI / 180.0 || Math.PI / 2.0 ; 
    if(! this.agent.data.percus)
        this.agent.data.percus = [] ; 
}

specialisation("compConeVision", COMPConeVision, Composant) ; 

COMPConeVision.prototype.application = function(dt){
    const perceptibles = this.agent.simulateur.perceptibles ; 
    this.agent.data.percus = [] ; 

    console.log("ANGL : ", this.agent.objet3d.rotation._y + this.demiAngle)
    console.log("ANG : ", perceptibles[1].objet3d.position.angleTo(this.agent.objet3d.position) )
    console.log("ANGR : ", this.agent.objet3d.rotation._y + this.demiAngle)

    perceptibles.forEach((a) => {
    	if(this.agent.objet3d.position.distanceTo(a.objet3d.position)<this.horizon
    		&&
    		this.agent.objet3d.rotation._y - this.demiAngle
    		<
    		a.objet3d.position.angleTo(this.agent.objet3d.position) 
    		< 
    		this.agent.objet3d.rotation._y + this.demiAngle)
                                    this.agent.data.percus.push(a) ; 
                               }) ;
    this.agent.data.cible = null ; 
    if(this.agent.data.percus.length > 1){
    	// console.log(this.agent.data.percus[1].objet3d.position.angleTo(this.agent.objet3d.position))
        this.agent.data.cible = this.agent.data.percus[1].objet3d.position ; 
    } ;
}






export default COMPS ; 


