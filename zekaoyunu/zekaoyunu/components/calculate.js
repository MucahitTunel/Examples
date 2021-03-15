function random(max,min){
  let rand = Math.floor(Math.random() * (max - min) + min);
  return (rand);
}


export function calculate(x,y,dizi,sonuc){

  var deger = 0;
  var toplam = 0;
  var fark = 0;
  if(x === 0){

      if(y === 0){
        deger = random(sonuc-dizi.length-1,1);
      }else if(y > 0 && y < dizi.length-1){
        for(let i = 0; i<y;i++){
          toplam = toplam + dizi[x][i];
        }
        fark = sonuc-toplam-dizi.length+y+1;
        deger = random(fark,1);
      }else {
        for(let i = 0; i<y;i++){
          toplam = toplam + dizi[x][i];
        }
        deger = sonuc-toplam;
      }
  }else if(x > 0 &&  x < dizi.length-1) {


    if(y<x){
      if(y===0){
        for(let i=0; i<x;i++){
          toplam = toplam + dizi[i][y];
        }
        fark = sonuc - toplam - dizi.length + y + 1;
        deger = random(fark,1);
      }else if (y > 0 && y < dizi.length-1) {
        var toplamx = 0;
        var toplamy = 0;

        for(let k = 0; k < x ; k++){
          toplamx = toplamx + dizi[k][y];
        }

        for(let j = 0; j < y ; j++){
          toplamy = toplamy + dizi[x][j];
        }

        if(toplamx > toplamy){
          fark = sonuc-toplamx-dizi.length+y+1;
          deger = random(fark,1);
        }else {
          fark = sonuc-toplamy-dizi.length+y+1;
          deger = random(fark,1);
        }
      }else {
        for(let i = 0; i<y;i++){
          toplam = toplam + dizi[x][i];
        }
        deger = sonuc-toplam;
      }
    }else {
      if(y===0){
        for(let i=0; i<x;i++){
          toplam = toplam + dizi[i][y];
        }
        fark = sonuc - toplam - dizi.length + x + 1;
        deger = random(fark,1);
      }else if (y > 0 && y < dizi.length-1) {
        var toplamx = 0;
        var toplamy = 0;

        for(let k = 0; k < x ; k++){
          toplamx = toplamx + dizi[k][y];
        }

        for(let j = 0; j < y ; j++){
          toplamy = toplamy + dizi[x][j];
        }

        if(toplamx > toplamy){
          fark = sonuc-toplamx-dizi.length+x+1;
          deger = random(fark,1);
        }else {
          fark = sonuc-toplamy-dizi.length+x+1;
          deger = random(fark,1);
        }
      }else {
        for(let i = 0; i<y;i++){
          toplam = toplam + dizi[x][i];
        }
        deger = sonuc-toplam;
      }
    }
  }else {
    for(let i = 0; i < x; i++){
      toplam = toplam + dizi[i][y]
    }
    deger = sonuc - toplam;
  }

  dizi[x][y] = deger;
  return(dizi);
}





export function shuffle(a) {
  var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
