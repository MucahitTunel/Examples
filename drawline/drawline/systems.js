import React, { Component } from "react";
import Constants from './Constants';

const RADIUS = 20;
const DEGERY = Math.floor((Constants.MAX_HEIGHT - 400) / 2);
const DEGERX = Math.floor((Constants.MAX_WIDTH - 400) / 2);


const GameLoop = (entities, { touches, dispatch, events }) => {

    let head = entities.head;
    let beden = entities.beden;


    touches.filter(t => t.type === "press").forEach(t => {

        let headx = head.position[0];
        headx = (headx*20)+10+DEGERX;
        let heady = head.position[1];
        heady = (heady*20)+10+DEGERY;


        for (var i = 1; i < 5 ; i++) {

            let deger = entities[i];
            let x = deger.position[0];
            let y = deger.position[1];

            x = (x*20)+10+DEGERX ;
            y = (y*20)+10+DEGERY;

            console.log("degerler === " + x + " --- " + y);

             var degerx = Math.floor( t.event.pageX);
             var degery = Math.floor( t.event.pageY);

             console.log(degerx);
             console.log(degery);

            if(((x + DEGERX) <= (degerx + 10 + DEGERX) && (x + DEGERX) >= (degerx - 10 + DEGERX)) && ((y + DEGERY)<= (degery + 10 + DEGERY) && (y + DEGERY) >= (degery - 10 + DEGERY) )){
                deger.backgroundColor = "yellow";
                console.log("----------------------------------------------------------------------------------");

                dispatch({ headx:(headx-DEGERX).toString(), heady:(heady - DEGERY).toString(), x: (x-DEGERX).toString(), y: (y - DEGERY).toString(), type:"ciz" })
            }

      }

    });

    return entities;
};

export { GameLoop };
