
import * as THREE from '../three/r120/build/three.module.js' ;
import PRIMS3D    from './prims3d.js' ; 
import COMPS      from './composants.js' ; 
import AGENTS     from './agents.js' ; 

// ==================================================================================

function v(x,y,z){
    return new THREE.Vector3(x,y,z) ; 
}

function vset(v,x,y,z){
    v.set(x,y,z) ; 
}

// ==================================================================================

function Fabrique(sim){
	this.simulateur = sim ; 
}


// ==================================================================================

Fabrique.prototype.genese = function(){

	const sim = this.simulateur ;

    const a0 = new AGENTS.agent("a0", {},sim) ; 
    a0.incarnation(PRIMS3D.soleil,{});

    // const a1  = new AGENTS.agentDyn("a1",{vMax:4.0}, sim);  
    // a1.incarnation(PRIMS3D.obj,{}) ; 
    // a1.placementEn(2,0,5) ; 
    // a1.ajoutComposant(COMPS.compDesignationCible,{});
    // a1.ajoutComposant(COMPS.compArrive,{}) ; 
    // sim.ajoutPerceptible(a1) ;
    // sim.ajoutAgent(a1) ; 

    const a2  = new AGENTS.agentDyn("a2",{vMax:4.0}, sim);  
    a2.incarnation(PRIMS3D.obj,{}) ; 
    a2.placementEn(3,0,5) ; 
    a2.ajoutComposant(COMPS.compAlea,{vMax:1.0}) ; 
    a2.ajoutComposant(COMPS.compCapteur360,{horizon:2}) ;  
    sim.ajoutPerceptible(a2) ;
    sim.ajoutAgent(a2) ; 	


    // const a1  = new AGENTS.agent("a1", {}, sim) ;  
    // a1.incarnation(PRIMS3D.obj,{}) ; 
    // a1.placementEn(5,0,2) ; 
    // a1.ajoutComposant(COMPS.compTest,{}) ; 
    // sim.ajoutPerceptible(a1) ; 
    // sim.ajoutAgent(a1) ; 

    // const a3 = new AGENTS.agentDyn("a3",{vMax:4.0},sim) ; 
    // a3.incarnation(PRIMS3D.obj,{}) ; 
    // a3.ajoutComposant(COMPS.compBoucle,{points:[v(0,0,0),v(8,0,2),v(5,0,8)]}) ; 
    // sim.ajoutPerceptible(a3) ;
    // sim.ajoutAgent(a3) ; 

    // const a4  = new AGENTS.agentDyn("a4", {vMax:4.0}, sim) ;  
    // a4.incarnation(PRIMS3D.obj,{}) ; 
    // //a2.placementEn(2,0,5) ;
    // a4.ajoutComposant(COMPS.compAlea,{vMax:1.0}) ; 
    // a4.ajoutComposant(COMPS.compCapteur360,{horizon:2}) ; 
    // a4.ajoutComposant(COMPS.compSeek, {}) ; 
    // sim.ajoutPerceptible(a4) ;
    // sim.ajoutAgent(a4) ; 

    // ===============
    // Création du sol
    // ===============

    const sol = new AGENTS.agent("sol",{},sim) ; 
    const mat_sol = PRIMS3D.standard("mat_sol",{couleur:{r:1,v:1,b:1},texture:"assets/textures/sols_plafonds/parquet1.jpg",nx:5,ny:5}) ; 
    sol.incarnation(PRIMS3D.sol,{largeur:30,materiau:"mat_sol"})
    sim.ajoutAgent(sol) ; 

    // =====================
    // Création d'amers
    // =====================

    const amer01 = new AGENTS.agent("amer01",{},sim) ; 
    amer01.incarnation(PRIMS3D.sphere,{rayon:0.2}) ;
    amer01.placementEn(0,0,0) ; 
    sim.ajoutPerceptible(amer01) ; 
    sim.ajoutAgent(amer01) ;  

    const amer02 = new AGENTS.agent("amer02",{},sim) ; 
    amer02.incarnation(PRIMS3D.sphere,{rayon:0.2}) ;
    amer02.placementEn(8,0,2) ; 
    sim.ajoutPerceptible(amer02) ; 
    sim.ajoutAgent(amer02) ;  

    const amer03 = new AGENTS.agent("amer03",{},sim) ; 
    amer03.incarnation(PRIMS3D.sphere,{rayon:0.2}) ;
    amer03.placementEn(5,0,8) ;
    sim.ajoutPerceptible(amer03) ;  
    sim.ajoutAgent(amer03) ;  

    const amer04 = new AGENTS.agent("amer04",{},sim) ; 
    // =====================
    // Création des tableaux
    // =====================
	
	const t1 = new AGENTS.agent("t001",{},sim) ; 
	t1.incarnation(PRIMS3D.poster,{largeur:3, hauteur:2,image:"assets/tableaux/58.jpg"}) ; 
    t1.placementEn(0,1.5,-15) ; 
	sim.ajoutAgent(t1) ; 
	
	const t2 = new AGENTS.agent("t002",{},sim) ; 
	t2.incarnation(PRIMS3D.poster,{largeur:3, hauteur:2,image:"assets/tableaux/aladin.jpg"}) ; 
    t2.placementEn(-15,1.5,0) ;
    t2.orientationSelon(0,Math.PI/2,0) ;  
	sim.ajoutAgent(t2) ; 

	
	const t3 = new AGENTS.agent("t003",{},sim) ; 
	t3.incarnation(PRIMS3D.poster,{largeur:3, hauteur:2,image:"assets/tableaux/jaune.jpg"}) ; 
    t3.placementEn(1,1.5,-5) ;
    t3.orientationSelon(0,0,0) ;  
	sim.ajoutAgent(t3) ; 

	const t4 = new AGENTS.agent("t003",{},sim) ; 
	t4.incarnation(PRIMS3D.poster,{largeur:3, hauteur:2,image:"assets/tableaux/neige.jpg"}) ; 
    t4.placementEn(0,1.5,-15) ;
    t4.orientationSelon(0,Math.PI,0) ;  
	sim.ajoutAgent(t4) ; 


	const t5 = new AGENTS.agent("t003",{},sim) ; 
	t5.incarnation(PRIMS3D.poster,{largeur:2, hauteur:3,image:"assets/tableaux/perles.jpg"}) ; 
    t5.placementEn(0,2,15) ;
    t5.orientationSelon(0,-Math.PI,0) ;  
	sim.ajoutAgent(t5) ; 
}








export default Fabrique ; 



