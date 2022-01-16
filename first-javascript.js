const numSites = parseInt(readline());

class Messites {

    constructor(siteId, x, y) {
        this._siteId = siteId,
            this._x = x ,
            this._y = y

    }

    get siteId() {
        return this._siteId;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

}

class Site {

    constructor(x, y, siteId, radius, structureType, param1, param2, owner, ignore1, ignore2) {
        this._x = x,
            this._y = y,
            this._siteId = siteId,
            this._radius = radius,
            this._owner = owner,
            this._param1 = param1,
            this._param2 = param2,
            this._structureType = structureType,
            this._ignore1 = null,
            this._ignore2 = null;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get siteId() {
        return this._siteId;
    }

    get radius() {
        return this._radius;
    }

    get param1() {
        return this._param1;
    }

    get param2() {
        return this._param2;
    }

    get ignore1() {
        return this._ignore1;
    }

    get ignore2() {
        return this._ignore2;
    }

    get owner() {
        return this._owner;
    }

    get structureType() {
        return this._structureType;
    }


    set owner(owne) {

        this._owner = owne;
    }

    set ignore1(ignore) {

        this._ignore1 = ignore;
    }

    set ignore2(ignore3) {

        this._ignore2 = ignore3;
    }

    set param1(param1) {

        this._param1 = param1;
    }

    set param2(param2) {

        this._owner = param2;
    }

    set structureType(structureType) {

        this._structureType = structureType;
    }

}

class Sitetobuild extends Site {
    constructor(x, y, siteId, distance, owner, radius, ignore1, ignore2, param1, param2, structureType) {
        super(x, y, siteId, owner, radius, ignore1, ignore2, param1, param2, structureType);
        this._distance = distance;

    }

    get distance() {
        return this._distance;
    }

    set distance(distance) {
        this._distance = distance;
    }
}

// class de la queen
class Queen {
    constructor(x, y) {
        this._x = x,
            this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

// Variable accésible partout
let listOfSite = [];
let queen = {};
let mesSites = [];

let listOfDistance = [];
let arrayOfSiteAvaible = [];

for (let i = 0; i < numSites; i++) {
    var inputs = readline().split(' ');
    const siteId = parseInt(inputs[0]);
    const x = parseInt(inputs[1]);
    const y = parseInt(inputs[2]);
    const radius = parseInt(inputs[3]);
    // Ajout des caractéristique a liste of site
    let site = new Site(x, y, siteId, radius);
    listOfSite.push(site);

}

// fonction de calcul de distance

function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    let result = Math.hypot(dx, dy);

    return result.toFixed(2);
}

function compare(a, b) {
    if (a.distance < b.distance)
        return -1;
    if (a.distance > b.distance)
        return 1;
    return 0;
}


// game loop
while (true) {
    var inputs = readline().split(' ');
    const gold = parseInt(inputs[0]);
    const touchedSite = parseInt(inputs[1]); // -1 if none
    for (let i = 0; i < numSites; i++) {
        var inputs = readline().split(' ');
        const siteId = parseInt(inputs[0]);
        const ignore1 = parseInt(inputs[1]); // used in future leagues
        const ignore2 = parseInt(inputs[2]); // used in future leagues
        const structureType = parseInt(inputs[3]); // -1 = No structure, 2 = Barracks
        const owner = parseInt(inputs[4]); // -1 = No structure, 0 = Friendly, 1 = Enemy
        const param1 = parseInt(inputs[5]);
        const param2 = parseInt(inputs[6]);
        // Ici tu vérifie si le site t'appartient , si c'est le cas tu l'ajoute a la liste de tes sites
        // Attribut qui change à chaque tours
        listOfSite.find(site => {
            if (site.siteId === siteId) {
                site.structureType = structureType;
                site.owner = owner;
                site.param1 = param1;
                site.param2 = param2;
                site.ignore1 = ignore1;
                site.ignore2 = ignore2;
            }
        });
         arrayOfSiteAvaible.find(site => {
            if (site.siteId === siteId) {
                site.structureType = structureType;
                site.owner = owner;
                site.param1 = param1;
                site.param2 = param2;
                site.ignore1 = ignore1;
                site.ignore2 = ignore2;
            }
        });
        if (owner === 0) {
            listOfSite.find(site => {
                if (site.siteId === siteId) {

                    let monSite = new Messites(siteId, site.x, site.y);
                    let trueOrFalse = mesSites.includes(siteId);
                    if (trueOrFalse === false) {
                        mesSites.push(monSite);
                    }
                }

            });
        }
    }
    const numUnits = parseInt(readline());
    for (let i = 0; i < numUnits; i++) {
        var inputs = readline().split(' ');
        const x = parseInt(inputs[0]);
        const y = parseInt(inputs[1]);
        const owner = parseInt(inputs[2]);
        const unitType = parseInt(inputs[3]); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
        const health = parseInt(inputs[4]);

        if (unitType === -1 && owner === 0) {
            queen = new Queen(x, y);

        }
    }

    // Write an action using print()


    // Ont effectue le calcul de distance et on créer une liste
    listOfSite.forEach(site => {
        let toPush = distance(site, queen);
      

        // printErr(JSON.stringify(site));
        if (toPush < 1000 && !arrayOfSiteAvaible.some(siteProche => siteProche.siteId === site.siteId)) {


            let toBuild = new Sitetobuild(site.x, site.y, site.siteId, toPush, site.owner, site.radius, site.ignore1, site.ignore2, site.param1, site.param2, site.structureType);
            arrayOfSiteAvaible.push(toBuild);
            arrayOfSiteAvaible.sort(compare);

        }
    });


         arrayOfSiteAvaible.forEach(site => {
             printErr(JSON.stringify(site));
         } )   
    

    //printErr(lePlusProche)
     arrayOfSiteAvaible.sort(compare);
        
   
        if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[0].siteId ) === false) {
      
       print(`BUILD ${arrayOfSiteAvaible[0].siteId} BARRACKS-KNIGHT`);
        print(`TRAIN ${arrayOfSiteAvaible[0].siteId}`);
       
        }
        
        
     if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[1].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[0].siteId) === true  ) {
   
        print(`BUILD ${arrayOfSiteAvaible[1].siteId} MINE`);
        print(`TRAIN ${arrayOfSiteAvaible[0].siteId}`);

    }   
         
   
    
       if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[2].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[1].siteId) === true  ) {
       
        print(`BUILD ${arrayOfSiteAvaible[2].siteId} MINE`);
        print(`TRAIN ${arrayOfSiteAvaible[1].siteId}`);
    
       }
         if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[3].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[2].siteId) === true  ) {

           print(`BUILD ${arrayOfSiteAvaible[3].siteId} MINE`);
        print(`TRAIN ${arrayOfSiteAvaible[1].siteId}`);
    }
    
      if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[4].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[3].siteId) === true  ) {

        print(`BUILD ${arrayOfSiteAvaible[4].siteId} MINE`);
        print(`TRAIN ${arrayOfSiteAvaible[1].siteId}`);
  
        
    }
    if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[5].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[4].siteId) === true  ) {

        print(`BUILD ${arrayOfSiteAvaible[5].siteId} TOWER`);
        print(`TRAIN ${arrayOfSiteAvaible[1].siteId}`);
        
    
 
        
    }
      if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[6].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[5].siteId) === true  ) {

        print(`BUILD ${arrayOfSiteAvaible[6].siteId} TOWER`);
        print(`TRAIN ${arrayOfSiteAvaible[0].siteId}`);
   
        

    }
    
         if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[7].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[6].siteId) === true  ) {

        print(`BUILD ${arrayOfSiteAvaible[7].siteId} TOWER`);
        print(`TRAIN ${arrayOfSiteAvaible[5].siteId}`);
         
        
        
    }
    
     if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[8].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[7].siteId) === true  ) {

        print(`BUILD ${arrayOfSiteAvaible[8].siteId} BARRACKS-KNIGHT`);
        print(`TRAIN ${arrayOfSiteAvaible[6].siteId}`);
        
    }
     if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[9].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[8].siteId) === true  ) {

        print(`BUILD ${arrayOfSiteAvaible[9].siteId} TOWER`);
        print(`TRAIN ${arrayOfSiteAvaible[0].siteId} ${arrayOfSiteAvaible[8].siteId} `);
        
    }
     if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[10].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[9].siteId) === true  ) {

        print(`BUILD ${arrayOfSiteAvaible[10].siteId} TOWER`);
        print(`TRAIN ${arrayOfSiteAvaible[5].siteId}`);
        
    } if (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[11].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[10].siteId) === true  ) {
        
     
         print(`BUILD ${arrayOfSiteAvaible[11].siteId} BARRACKS-KNIGHT`);
        print(`TRAIN ${arrayOfSiteAvaible[11].siteId}`);
        
    } 
  if  (mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[12].siteId) === false && mesSites.some(siteProche => siteProche.siteId === arrayOfSiteAvaible[11].siteId) === true  ) { 
          print(`BUILD ${arrayOfSiteAvaible[12].siteId} BARRACKS-KNIGHT`);
        print(`TRAIN ${arrayOfSiteAvaible[11].siteId}`);
    }

}

