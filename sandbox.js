











function ship_create(type, hull, sustain) {
//i _think_ that the ship types need to be confined to  this list but not sure yet: pds, fight, car, des, cru, dred, sun, gf
    this.shipType = type;
    this.shipHull = hull;
    this.shipSustain = sustain;
}


    function fleet_properties(pds, fight, car, des, cru, dred, sun, gf ){

    this.pds = pds;
    this.fight = fight;
    this.car = car;
    this.des = des;
    this.cru = cru;
    this.dred = dred;
    this.sun = sun;
    this.gf = gf;

}


function fleetCreate2(p, f, car, d, cru, dre, s, g ){

    for (i=1, i<= p, i++){
        var objName = "pds" + i;
        this.[objName] = ship_create("pds", 1, false)

    }
    for (i=1, i<= f, i++){
        var objName = "fight" + i;
        this.[objName] = ship_create("fight", 1, false)

    }
    for (i=1, i<= car, i++){
        var objName = "car" + i;
        this.[objName] = ship_create("car", 1, false)

    }
    for (i=1, i<= d, i++){
        var objName = "des" + i;
        this.[objName] = ship_create("des", 1, false)

    }
    for (i=1, i<= cru, i++){
        var objName = "cru" + i;
        this.[objName] = ship_create("cru", 1, false)

    }    for (i=1, i<= dre, i++){
        var objName = "dred" + i;
        this.[objName] = ship_create("dred", 2, true)

    }
    for (i=1, i<= s, i++){
        var objName = "sun" + i;
        this.[objName] = ship_create("sun", 2, true)

    }
    for (i=1, i<= g, i++){
        var objName = "gf" + i;
        this.[objName] = ship_create("gf", 1, false)

    }


}