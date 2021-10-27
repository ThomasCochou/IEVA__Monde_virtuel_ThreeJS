
import * as THREE from '../three/r120/build/three.module.js' ;
import {OBJLoader} from '../three/r120/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from '../three/r120/examples/jsm/loaders/MTLLoader.js';

var PRIMS3D = {materiaux:{}} ;
PRIMS3D.textureLoader = new THREE.TextureLoader() ; 

PRIMS3D.materiaux.materiauBlanc = new THREE.MeshLambertMaterial({color:0xffffff}) ;
PRIMS3D.materiaux.materiauRouge = new THREE.MeshLambertMaterial({color:0xff0000}) ;
PRIMS3D.materiaux.materiauGris = new THREE.MeshLambertMaterial({color:0xa9a9a9}) ;

PRIMS3D.groupe = function(nom){
	var groupe = new THREE.Group() ;
	groupe.name = nom ;
	return groupe ;
}




PRIMS3D.boite = function(nom,options){
	var largeur    = options.largeur   || 1.0 ;
	var hauteur    = options.hauteur   || 1.0 ;
	var epaisseur  = options.epaisseur || 1.0 ;
	var materiau   = options.materiau  || "materiauRouge" ;

	var geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ;
    var mat  = PRIMS3D.materiaux[materiau] || PRIMS3D.materiaux.materiauRouge ; 
    //var mat = new THREE.MeshNormalMaterial() ;
	var mesh = new THREE.Mesh(geo, mat) ;
	mesh.name = nom ;
	return mesh ;
}


PRIMS3D.sphere = function(nom,options){
	var rayon        = options.rayon        || 1.0 ;
	var subdivisions = options.subdivisions || 16 ;
	var materiau     = options.materiau     || "materiauRouge" ;

	var geo  = new THREE.SphereGeometry(rayon, subdivisions, subdivisions) ;
    var mat  = PRIMS3D.materiaux[materiau] || PRIMS3D.materiaux.materiauRouge ; 
	var mesh = new THREE.Mesh(geo, mat) ;
	mesh.name = nom ;
	return mesh ;
}






PRIMS3D.sol = function(nom,options){
	var largeur    = options.largeur    || 100.0 ;
	var profondeur = options.profondeur || largeur ;
	var materiau   = options.materiau   || "materiauRouge" ;

	var geo   = new THREE.PlaneGeometry(
					largeur,profondeur,
					Math.floor(largeur/10.0)+1, Math.floor(profondeur/10)+1) ;
    var mat  = PRIMS3D.materiaux[materiau] || PRIMS3D.materiaux.materiauRouge ; 
	var mesh = new THREE.Mesh(geo, mat) ;
	mesh.name = nom ;
	mesh.rotation.x = - Math.PI / 2 ;
	return mesh ;
}

PRIMS3D.cloison = function(nom,options){
	var largeur   = options.largeur   || 1.0 ;
	var hauteur   = options.hauteur   || 1.0 ;
	var epaisseur = options.epaisseur || 1.0 ;
	var materiau  = options.materiau  || "materiauRouge" ;

	var geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ;
    var mat  = PRIMS3D.materiaux[materiau] || PRIMS3D.materiaux.materiauRouge ; 
	var mesh = new THREE.Mesh(geo, mat) ;
	var groupe = new THREE.Group() ;
	groupe.name = nom ;
	groupe.add(mesh) ;
	mesh.position.set(0,hauteur/2.0,0) ;
	return groupe ;
}

PRIMS3D.poster = function(nom,options){
	var largeur = options.largeur || 1.0 ;
	var hauteur = options.hauteur || 1.0 ;
	var nomImage = options.image ;
	console.log(nomImage);
	var geo    = new THREE.PlaneGeometry(largeur, hauteur) ;
	var mat    = PRIMS3D.materiauTexture(nomImage, 0xffffff) ;
	var mesh   = new THREE.Mesh(geo, mat) ;
    	mesh.name  = "poster_"+nom ;
	var dos    = new THREE.Mesh(geo, PRIMS3D.materiauBlanc) ;
	dos.rotation.y = Math.PI ;
	dos.position.z = -0.01 ;
	mesh.position.z = 0.01 ;

	var groupe = new THREE.Group() ;
	groupe.add(mesh) ;
	groupe.add(dos) ;
	groupe.name  = nom ;
	return groupe ;
}


PRIMS3D.obj = function(nom,options){



    // options = options || {} ; 

    const repertoire = options.repertoire || "./assets/obj/pingouin/" ; 
    const nomObj     = options.obj || "penguin.obj" ; 
    const nomMtl     = options.mtl || "penguin.mtl" ; 

    console.log("Chargement de OBJ : ", repertoire,"/",nomObj) ; 

	const resultat = new THREE.Group() ;

	const objLoader = new OBJLoader() ;
	const mtlLoader = new MTLLoader() ;
	mtlLoader.setPath(repertoire) ;
	mtlLoader.load(nomMtl, function(materials){
		materials.preload() ;
		objLoader.setMaterials(materials);
		objLoader.setPath(repertoire) ;
		objLoader.load(nomObj, function(obj){
			resultat.add(obj);
		})
	}) ;


    console.log(resultat) ; 

	return resultat ;
}

PRIMS3D.reticule = function(){
	var material = new THREE.LineBasicMaterial({ color: 0x000000 });
	
	var x = 0.01, y = 0.01;
	var geometry = new THREE.Geometry();
	// crosshair
	geometry.vertices.push(new THREE.Vector3(0, y, 0));
	geometry.vertices.push(new THREE.Vector3(0, -y, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	geometry.vertices.push(new THREE.Vector3(x, 0, 0));
	geometry.vertices.push(new THREE.Vector3(-x, 0, 0));

	var crosshair = new THREE.Line( geometry, material );


    	var crosshairPercentX = 50;
	var crosshairPercentY = 50;
	var material = new THREE.LineBasicMaterial({ color: 0xFFAAFF });
	
	var x = 0.01, y = 0.01;
	var geometry = new THREE.Geometry();
	// crosshair
	geometry.vertices.push(new THREE.Vector3(0, y, 0));
	geometry.vertices.push(new THREE.Vector3(0, -y, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	geometry.vertices.push(new THREE.Vector3(x, 0, 0));
	geometry.vertices.push(new THREE.Vector3(-x, 0, 0));

	var crosshair = new THREE.Line( geometry, material );


    	var crosshairPercentX = 50;
	var crosshairPercentY = 50;
	var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
	var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;

	crosshair.position.x = crosshairPositionX * window.innerWidth / window.innerHeight;
	crosshair.position.y = crosshairPositionY;
	crosshair.position.z = -0.3; crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
	var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;

	return crosshair ;
}




// ====================
// Traitement de meshes
// ====================

PRIMS3D.placer = function(mesh,x,y,z){
	mesh.position.set(x,y,z)  ;
}

PRIMS3D.orienter = function(mesh,y){
	mesh.rotation.y = y ;
}


PRIMS3D.fixerEchelleMesh = function(mesh,sx,sy,sz){
	mesh.scale.set(sx,sy,sz) ;
}

PRIMS3D.placerSous = function(fils,pere){
	pere.add(fils) ;
}



// ===================
// Création de sources
// ===================

PRIMS3D.ampoule = function(nom, options){
    const couleur     = options.couleur || new THREE.Color(0xffffff) ; 
    const intensite   = options.intensite || 1.0 ; 
    const portee      = options.portee || 10.0 ; 
    const attenuation = options.attenuation || 2 ; 

	var light = new THREE.PointLight(couleur,intensite,portee,attenuation) ;
	return light ;
}

PRIMS3D.soleil = function(nom,options){
	const intensite = options.intensite || 1.0 ; 
	var h = new THREE.HemisphereLight(0xffffbb,0x080820,intensite) ;
	return h ;
}

// =====================
// Création de matériaux
// =====================

/*
var materiauBlanc  = creerLambert(0xffffff) ;
var materiauRouge  = creerLambert(0xff0000) ;
var materiauVert   = creerLambert(0x00ff00) ;

var materiauParquet = creerLambertTexture("assets/textures/sol/parquet1.jpg",0xffffff,10,10) ;
var materiauDante   = creerLambertTexture("assets/textures/murs/dante.jpg",0xffffff,1,1) ;
var materiauBrique  = creerLambertTexture("assets/textures/murs/bricks3.jpg",0xffffff,6,2) ;
*/


PRIMS3D.standard = function(nom,params){
   params = params || {} ; 
    const couleur = params.couleur || {r:0,v:0,b:0} ; 
    const texture = params.texture || null ; 
    const nx      = params.nx      || 1 ; 
    const ny      = params.ny      || 1 ; 
    
    const r = couleur.r || 0.0 ; 
    const v = couleur.v || 0.0 ; 
    const b = couleur.b || 0.0 ; 
    
    const color = new THREE.Color(r,v,b) ;
    
    let mat = null ; 	
    if(texture!=null){
        const tex = PRIMS3D.textureLoader.load(texture) ; 
	console.log("TEXTURE : ", texture) ; 
	mat = PRIMS3D.materiauTexture(texture, color,nx,ny) ; 
        // mat = new THREE.MeshStandardMaterial({color:color, map:texture}) ; 
	   // mat.map.wrapS = THREE.RepeatWrapping ;
	   // mat.map.wrapT = THREE.RepeatWrapping ;
	   // mat.map.repeat.set(nx,ny) ; 
    } else {
         mat = new THREE.MeshStandardMaterial({color:color}) ; 
    } ; 
    PRIMS3D.materiaux[nom] = mat ;
    console.log("Materiaux : ", nom, " = ", mat," ::", PRIMS3D.materiaux) ;    
    return mat ; 
}


/*
PRIMS3D.standard = function(nom,params){
    params = params || {} ; 
    const couleur = params.couleur || {r:0,v:0,b:0} ; 
    const texture = params.texture || null ; 
    const nx      = params.nx      || 1 ; 
    const ny      = params.ny      || 1 ; 
    
    const r = couleur.r || 0.0 ; 
    const v = couleur.v || 0.0 ; 
    const b = couleur.b || 0.0 ; 
    
    const color = new THREE.Color(r,v,b) ;  

    if(texture!=null){
        const tex = this.textureLoader.load(texture) ; 
        const mat = new THREE.MeshStandardMaterial({color:color, map:texture}) ; 
	    mat.map.wrapS = THREE.RepeatWrapping ;
	    mat.map.wrapT = THREE.RepeatWrapping ;
	    mat.map.repeat.set(nx,ny) ; 
	    return mat ; 
    } else {
        const mat = new THREE.MeshStandardMaterial({color:color}) ; 
	return mat ;
    }

}
*/


/*
function(options){
	var couleur = options.couleur || 0xffffff ;
  	var mat = new THREE.MeshStandardMaterial({color:couleur}) ;
	return mat ;
}
*/
PRIMS3D.materiauTexture = function(nomImage,couleur,nx,ny){
	var textureLoader = new THREE.TextureLoader() ;
	var texture = textureLoader.load(nomImage) ;
	var mat = new THREE.MeshStandardMaterial({color:couleur,map:texture}) ;
	nx = nx ||   1 ;
	ny = ny ||   1 ;
	mat.map.wrapS = THREE.RepeatWrapping ;
	mat.map.wrapT = THREE.RepeatWrapping ;
	mat.map.repeat.set(nx,ny) ;
	return mat ;
}


export default PRIMS3D ;
