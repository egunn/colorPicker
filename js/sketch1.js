//adjust the size and position of the SVG to ensure that it has margins around the edge of the screen.
var svg = d3.select("#plot1"),
    margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var svg2 = d3.select("#plot2");
var svg3 = d3.select("#plot3");

var x = d3.scalePoint().rangeRound([0, width]).padding(0.1), //use for categorical axis - divides axis into discrete steps of the right width to fill the axis length
    y = d3.scaleLinear().rangeRound([height, 0]); //continuous scaling of y axis.

var color1 = '#AB2567', color2 = '#AB2567'; addColor = '#AB2567';


var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + 70)+ ")"); //move the group to the right place
var g2 = svg2.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //move the group to the right place
var g3 = svg2.append("g")
    .attr("transform", "translate(" + (margin.left +550) + "," + (margin.top +30) + ")"); //move the group to the right place
var g4 = svg3.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top  + ")"); //move the group to the right place


console.log(toHex(d3.rgb('#AB2567').toString()));

var numSteps = 21;
var numRows = 15;
var hue, saturation,value;
var type;
var colorArray = [];
var rectsArray1 = [];
var gradientArray = [];
var labArray = [];
var rectsArray2 = [];
var paletteArray = [];
var tempPaletteArray = [];
var lightStep = 8;
var aStep = 200/numSteps;
var bStep = 200/numSteps;
var previous = [];
var previousTemp = [];
var sumChecked = false;
var interpolate = false;
var reverseColorScale = false;
var weight = .5;
var addWeight = .9;
var centerColor = null;

var colors = {
    white:'#FFFFFF',
    silver:'#C0C0C0',
    gray:'#808080',
    black:'#000000',
    merlotred:'#720030',
    rosepink:'#d14d84',
    fuschiapink:'#ff1677',
    red:'#FF0000',
    pink:'#f7a8a8',
    salmon:'#f94848',
    maroon:'#800000',
    yellow:'#FFFF00',
    mustardyellow:'#ce8629',
    orangeyellow:'#f7910e',
    olive:'#808000',
    lime:'#00FF00',
    yellowgreen:'#8CD34A',
    mossgreen:'#336d07',
    green:'#008000',
    aqua:'#00FFFF',
    lightteal:'#7beddd',
    teal:'#008080',
    slateblue:'#7192c6',
    periwinkleblue:'#a8c6f7',
    skyblue:'#4286f4',
    blue:'#0000FF',
    navy:'#000080',
    lavenderpurple:'#b9a0d3',
    graypurple:'#714e96',
    pinkpurple:'#9e559e',
    fuschsiapurple:'#FF00FF',
    purple:'#800080',
    darkforestgreen:'#002925',
    royalblue:'#0037f2',
    pinegreen:'#004d48',
    darkteal:'#00615b',
    violet_black:'#170035',
    deepblue:'#24007d',
    purple_black:'#26001e',
    darkbrown:'#261205',
    darkblue_purple:'#3f0092',
    darkpurple:'#3f0092',
    mahoganybrown:'#420b00',
    deeppurple:'#46005f',
    mediumteal:'#4ab5ac',
    mediumbrown:'#563200',
    lightolivegreen:'#6a7650',
    darkred_purple:'#6e0046',
    blue_purple:'#7543e6',
    darkred:'#76001d',
    darkfuchsia:'#840059',
    lightslate:'#88bdcc',
    Bordeauxdarkpurple_red:'#8b003c',
    mediumbrown:'#904a3f',
    darkbrickred:'#910000',
    mustardbrown:'#916b2d',
    lightteal:'#91f8ef',
    red_purple:'#961c7d',
    darkraspberry:'#a3134e',
    khakitan:'#a59a78',
    paleaqua:'#a8ffff',
    palegreen:'#aad0a0',
    mediumgray:'#acafab',
    brickred:'#ad0700',
    magenta_purple:'#ad3691',
    mediumgray:'#afa0ae',
    tealgray:'#b1bcc3',
    greengray:'#b1d7d9',
    lightbrown:'#b45922',
    darkdustyrose:'#c15685',
    deepred_orange:'#c62b00',
    mediumpurple:'#cb66df',
    dustypink:'#cb6966',
    pastelpurple:'#d597ff',
    palegreen:'#d5e2b6',
    raspberry:'#d64764',
    tan:'#d7926b',
    rosegray:'#d7afc4',
    palepinkgray:'#dbccda',
    lightpurple:'#ddafff',
    mintgreen:'#ddffff',
    red_orange:'#e04400',
    raspberrysorbet:'#eb5f89',
    salmonorange:'#f65c43',
    lightpink:'#fddeff',
    magenta:'#ff00ff',
    magentapink:'#ff61c6',
    gray_pink:'#ff697b',
    tangerineorange:'#ff7100',
    lighttangerineorange:'#ff8842',
    orange_pink:'#ff897d',
    lightrose:'#ff8ba1',
    lightfuchsiapurple:'#ff8dff',
    marigoldyellow:'#ff9d00',
    blushpink:'#ffa092',
    dustyrosepink:'#ffaddb',
    orangesherbet:'#ffb56b',
    lightpink:'#ffbbff',
    lightpurple_pink:'#ffbdff',
    lightrosepink:'#ffbeda',
    lightpeach:'#ffcc95',
    lightpeach:'#ffcebd',
    babypink:'#ffcfe3',
    palepink:'#ffd1ff',
    lightpink:'#ffd2ff',
    pinktint:'#ffe3ff',
    lightpastelyellow:'#fff3cd',
    eggshellwhite:'#fff9ff',
    mustardbrown:'#ae8522',
    olive:'#797c00',
    caramel:'#c37d26',
    lightbrown:'#935600',
    cocoabrown:'#514665',
    peachpink:'#f07296',
    purpletint:'#e7dbff',
    capuccinobrown:'#7c5a55',
    palebrown:'#8b6e79',
    mintgreentint:'#d2e5e4',
    eggshellgray:'#e6dfe4',
    pastelgreen:'#acd784',
    lightyellowgreen:'#eaff6f',
    pastelyellow:'#ffff6d',
    custardyellow:'#f6e68f',
    lightyellowbrown:'#decf7a',
    greengraytint:'#dbe8dd',
    khakibeige:'#cdd1b4',
    mediumgreengray:'#7b9198',
    electricblue:'#0055fc',
    paleyellow:'#ffef9b',
    caramelbrown:'#bc7636',
    lightmustardyellow:'#d7ac00',
    bluegray:'#bcc6e1',
    mediumkhakigray:'#5e5d66',
    mediumbrown:'#775700',
    latte:'#ad9476',
    coffee:'#363546',
    tealblue:'#004c99'

};

//l = 0-200; a = -100-100; b = -100-100;

var scaleColor = d3.scaleLinear()
    .domain([1,numSteps]).range([color1, color1]).interpolate(d3.interpolateLab);

var scaleX = d3.scalePoint().domain([0, 1, 2, 3]).range([0, 300]);
var scaleY = d3.scaleLinear().domain([0,10]).range([250, 0]);

// Add the x Axis
g3.append("g")
    .attr('transform','translate(0,250)')  //move the x axis from the top of the y axis to the bottom
    .attr('class','axis')
    .call(d3.axisBottom(scaleX));

g3.append("g")
    .attr('class','axis')
    .call(d3.axisLeft(scaleY));


var makeLine = d3.line()
    .x(function(d,i) { return scaleX(i); })
    .y(function(d) { return scaleY(d); });

drawColors();


function drawColors() {
  for (var i=0; i < numSteps; i++){
    for (var j=0; j < numRows; j++){
        rectsArray1.push({ row:j, column:i });
        rectsArray2.push({ row:j, column:i });
    }

    //colorArray.push({
      //hue: i*(360/numSteps), saturation: 1, value: 0.5, row:1, column:i
    //});
  }

  g.selectAll('.colorBars1')
      .data(rectsArray1)//colorArray)
      .enter()
      .append('rect')
      .attr('class','colorBars1')
      .attr('x',function(d,i){
          return d.column*23;
      })
      .attr('y',function(d,i){
          return d.row*27;
      })
      .attr('width', 20)
      .attr('height',20)
      .attr('fill',function(d,i){

          if (sumChecked == false){

              var temp;

              if (centerColor == null){
                  temp = d3.lab(color1);//scaleColor(d.column));
              }
             else {
                  temp = d3.lab(centerColor);//scaleColor(d.column));
              }


              if(interpolate == false){
                  temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
                  temp.a = temp.a-aStep*(d.column-(numSteps-1)/2);
              }
              else if (interpolate == true){
                  temp.l = temp.l-lightStep*(d.row-(numRows-1)/2) + (1-weight) * d3.lab(scaleColor(d.column)).l;
                  temp.a = temp.a-aStep*(d.column-(numSteps-1)/2) + (1-weight) * d3.lab(scaleColor(d.column)).a;
              }

              return temp;
          }
          else {

              var temp;

              if (centerColor == null){
                  temp = d3.lab(color1);//scaleColor(d.column));
              }
              else {
                  temp = d3.lab(centerColor);//scaleColor(d.column));
              }

              temp.l = (weight * temp.l) + (1-weight) * d3.lab(color2).l;
              temp.a = (weight * temp.a) + (1-weight) * d3.lab(color2).a;
              temp.b = (weight * temp.b) + (1-weight) * d3.lab(color2).b;

              temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
              temp.a = temp.a-aStep*(d.column-(numSteps-1)/2);

              return temp;
          }

      })
      .attr('stroke',function(d,i){
          if (d.row == 7 && d.column == 10){
              return 'white'
          }
          else{
              return 'none'
          }
      })
      .attr('stroke-width', 2)
      .on('click', function(d){
          //console.log(d3.select(this).attr('fill'));
          paletteArray.push({color: d3.select(this).attr('fill'), points:[Math.random()*10, Math.random()*10,Math.random()*10,Math.random()*10]});

          drawPalette();
          drawChart();
          printColors();
      })
      .on('mouseover',function(d,i){
          var getColor = nearestColor.from(colors);
          //d3.select(this).append("svg:title")
          //    .text(getColor(d3.select(this).attr('fill')).name);

          if(typeof d.color === "object"){
              d3.select(this).select('title')
                  .text(getColor(toHex(d3.rgb(d3.select(this).attr('fill')).toString())).name);
          }
          else if(d3.select(this).attr('fill').substr(0,1) == "r" || d3.select(this).attr('fill').substr(0,2) == " r") {
              d3.select(this).select('title')
                  //.text(getColor(toHex(d3.select(this).attr('fill'))).name);
                  .text(getColor(toHex(d3.rgb(d3.select(this).attr('fill')).toString())).name);
          }
          else if(d3.select(this).attr('fill').substr(0,1)=="#" || d3.select(this).attr('fill').substr(0,2)==" #" ){
              d3.select(this).select('title')
                  .text(getColor(d3.rgb(d3.select(this).attr('fill')).toString()).name);
          }


      })
      .append("title");


    g.selectAll('.colorBars2')
        .data(rectsArray2)//colorArray)
        .enter()
        .append('rect')
        .attr('class','colorBars2')
        .attr('x',function(d,i){
            return d.column*23 + 515;
        })
        .attr('y',function(d,i){
            return d.row*27;
        })
        .attr('width', 20)
        .attr('height',20)
        .attr('fill',function(d,i){

            if (sumChecked == false){
                var temp;

                if (centerColor == null){
                    temp = d3.lab(color1);//scaleColor(d.column));
                }
                else {
                    temp = d3.lab(centerColor);//scaleColor(d.column));
                }


                temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
                temp.b = temp.b-bStep*(d.column-(numSteps-1)/2);
                return temp;
            }
            else {

                var temp;

                if (centerColor == null){
                    temp = d3.lab(color1);//scaleColor(d.column));
                }
                else {
                    temp = d3.lab(centerColor);//scaleColor(d.column));
                }

                temp.l = (weight * temp.l) + (1-weight) * d3.lab(color2).l;
                temp.a = (weight * temp.a) + (1-weight) * d3.lab(color2).a;
                temp.b = (weight * temp.b) + (1-weight) * d3.lab(color2).b;

                temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
                temp.b = temp.b-bStep*(d.column-(numSteps-1)/2);
                return temp;
            }

        })
        .attr('stroke',function(d,i){
            if (d.row == 7 && d.column == 10){
                return 'white'
            }
            else{
                return 'none'
            }
        })
        .attr('stroke-width', 2)
        .on('click', function(d){
            //console.log(d3.select(this).attr('fill'));

            paletteArray.push({color: d3.select(this).attr('fill'), points:[Math.random()*10, Math.random()*10,Math.random()*10,Math.random()*10]});

            drawPalette();
            drawChart();
            printColors();
        })
        .on('mouseover',function(d,i){
            var getColor = nearestColor.from(colors);
            d3.select(this).select("title")
                .text(getColor(d3.select(this).attr('fill')).name);

        })
        .append("title");


    for (var i=0; i<numSteps; i++){
        gradientArray.push({location:i, color:scaleColor(i)});
    }

    g.selectAll('.gradientBars')
        .data(gradientArray)
        .enter()
        .append('rect')
        .attr('class','gradientBars')
        .attr('x',function(d,i){
            return d.location*23;
        })
        .attr('y', -75)
        .attr('width', 20)
        .attr('height',20)
        .attr('fill',function(d){
            return d.color;
        })
        .on('click', function(d){
            //console.log(d3.select(this).attr('fill'));

            paletteArray.push({color: d3.select(this).attr('fill'), points:[Math.random()*10, Math.random()*10,Math.random()*10,Math.random()*10]});

            drawPalette();
            drawChart();
            printColors();
        })
        .on('mouseover',function(d,i){
            var getColor = nearestColor.from(colors);
            d3.select(this).select("title")
                .text(getColor(d3.select(this).attr('fill')).name);

        })
        .append("title");


    for (var i=0; i<numSteps; i++){
        labArray.push({location:i, l:200-i*(200/numRows), a:-aStep*(i-((numSteps-1)/2)),b:-bStep*((i-(numSteps-1)/2))});
    }

    g.selectAll('.labABars')
        .data(labArray)
        .enter()
        .append('rect')
        .attr('class','labABars')
        .attr('x',function(d,i){
            return d.location*23;
        })
        .attr('y', -35)
        .attr('width', 20)
        .attr('height',10)
        .attr('fill',function(d){
            return d3.lab(100,d.a,0);
        });

    g.selectAll('.labBBars')
        .data(labArray)
        .enter()
        .append('rect')
        .attr('class','labBBars')
        .attr('x',function(d,i){
            return d.location*23 + 515;
        })
        .attr('y', -35)
        .attr('width', 20)
        .attr('height',10)
        .attr('fill',function(d){
            return d3.lab(100,0,d.b);
        });

    g.selectAll('.labLBars')
        .data(labArray.splice(0,numRows))
        .enter()
        .append('rect')
        .attr('class','labBBars')
        .attr('x', -35)
        .attr('y', function(d){
            return d.location*27;
        })
        .attr('width', 10)
        .attr('height',20)
        .attr('fill',function(d){
            return d3.lab(d.l,0,0);
        })

    g.append('text')
        .attr('x',-50)
        .attr('y', 15)
        .text('L:')

    g.append('text')
        .attr('x',-15)
        .attr('y', -26)
        .text('A:')

    g.append('text')
        .attr('x',498)
        .attr('y', -25)
        .text('B:')

    g.append('text')
        .attr('x',-15)
        .attr('y', -60)
        .text('I:')

}


function drawPalette() {

    g2.selectAll('*').remove();
    g4.selectAll('*').remove();

    g2.append('text').attr('y',15).text('Click a color to remove. Shift-click to re-center color picker above').attr('fill','gainsboro');
    g2.append('text').attr('y',15+225).text('Click on a box to turn on centers').attr('fill','gainsboro');

    g3.append('text').attr('y',-13).text('Click on a line to remove').attr('fill','gainsboro');

    g4.append('text').attr('y',15).text('original palette').attr('fill','gainsboro');
    g4.append('text').attr('y',240).text('plus new shade').attr('fill','gainsboro');

    g2.selectAll('.paletteBars')
        .data(paletteArray)
        .enter()
        .append('rect')
        .attr('class','paletteBars')
        .attr('x',function(d,i){
            if (i<8){
                return i*57;
            }
            else if(i>=8 && i<16){
                return (i-8)*57;
            }
            else if(i>=16 && i<24){
                return (i-16)*57;
            }

        })
        .attr('y',function(d,i){
            if (i<8){
                return 25;
            }
            else if(i>=8 && i<16){
                return 83;
            }
            else if(i>=16 && i<24){
                return 140;
            }
        })
        .attr('width', 50)
        .attr('height',50)
        .attr('fill',function(d,i){
            return d.color;
        })
        .on('click',function(d,i){
            if (d3.event.shiftKey){
                //if it's already a color object, convert to string before sending to hex converter
                if(typeof d.color === "object"){
                    console.log(toHex(d3.rgb(d.color).toString()).slice(1));
                    document.getElementById("color1").jscolor.fromString(toHex(d3.rgb(d.color).toString()).slice(1));
                }
                //otherwise, just use the string, already
                else {
                    document.getElementById("color1").jscolor.fromString(toHex(d.color).slice(1)); //convert from RGB to hex, cut off # sign

                }
                updateBeginColor(toHex(d.color).slice(1));
            }
            else{
                previous = paletteArray.splice(i,1);
                previousTemp = tempPaletteArray.splice(i,1);
                drawPalette();
                drawChart();
                printColors();
            }
        })
        .on('mouseover',function(d,i){
            var getColor = nearestColor.from(colors);

            if(typeof d.color === "object"){

                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d.color).toString()).name);
            }
            else if(d.color.substr(0,1) == "r" || d.color.substr(0,2) == " r") {
                d3.select(this).select("title")
                    .text(getColor(toHex(d.color)).name);
            }
            else if(d.color.substr(0,1)=="#" || d.color.substr(0,2)==" #" ){
                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d.color).toString()).name);
            }

        })
        .append("title");


    g4.selectAll('.paletteBars')
        .data(paletteArray)
        .enter()
        .append('rect')
        .attr('class','paletteBars')
        .attr('x',function(d,i){
            if (i<8){
                return i*57;
            }
            else if(i>=8 && i<16){
                return (i-8)*57;
            }
            else if(i>=16 && i<24){
                return (i-16)*57;
            }

        })
        .attr('y',function(d,i){
            if (i<8){
                return 25;
            }
            else if(i>=8 && i<16){
                return 83;
            }
            else if(i>=16 && i<24){
                return 140;
            }
        })
        .attr('width', 50)
        .attr('height',50)
        .attr('fill',function(d,i){
            return d.color;
        })
        .on('click',function(d,i){
            if (d3.event.shiftKey){
                document.getElementById("color1").jscolor.fromString(toHex(d.color).slice(1)); //convert from RGB to hex, cut off # sign
                updateBeginColor(toHex(d.color).slice(1));
            }
            else{
                previous = paletteArray.splice(i,1);
                previousTemp = tempPaletteArray.splice(i,1);
                drawPalette();
                drawChart();
                printColors();
            }
        })
        .on('mouseover',function(d,i){
            //var nearestColor = require('nearest-color').from(colors);
            var getColor = nearestColor.from(colors);

            if(typeof d.color === "object"){
                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d.color).toString()).name);
            }
            else if (d.color.substr(0,1) == "r" || d.color.substr(0,2) == " r") {
                d3.select(this).select("title")
                    .text(getColor(toHex(d.color)).name);
            }
            else if(d.color.substr(0,1)=="#" || d.color.substr(0,2)==" #" ){
                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d.color).toString()).name);
            }

        })
        .append("title");

    g2.selectAll('.paletteBarsTouch')
        .data(paletteArray)
        .enter()
        .append('rect')
        .attr('class','paletteBarsTouch')
        .attr('x',function(d,i){
            if (i<8){
                return i*50;
            }
            else if(i>=8 && i<16){
                return (i-8)*50;
            }
            else if(i>=16 && i<24){
                return (i-16)*50;
            }

        })
        .attr('y',function(d,i){
            if (i<8){
                return 225 + 25;
            }
            else if(i>=8 && i<16){
                return 225+ 75;
            }
            else if(i>=16 && i<24){
                return 225 + 125;
            }
        })
        .attr('width', 50)
        .attr('height',50)
        .attr('fill',function(d,i){
            return d.color;
        })
        .on('click',function(d,i){
            centerColor = d3.select(this).attr('fill');
            drawPalette();
            /*previous = paletteArray.splice(i,1);
            drawPalette();
            drawChart();
            printColors();*/
        })
        .on('mouseover',function(d,i){
            var getColor = nearestColor.from(colors);

            if(typeof d.color === "object"){
                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d.color).toString()).name);
            }
            else if(d.color.substr(0,1) == "r" || d.color.substr(0,2) == " r") {
                d3.select(this).select("title")
                    .text(getColor(toHex(d.color)).name);
            }
            else if(d.color.substr(0,1)=="#" || d.color.substr(0,2)==" #" ){
                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d.color).toString()).name);
            }

        })
        .append("title");

    g2.selectAll('.paletteBarsTouchCenters')
        .data(paletteArray)
        .enter()
        .append('rect')
        .attr('class','paletteBarsTouchCenters')
        .attr('x',function(d,i){
            if (i<8){
                return i*50+15;
            }
            else if(i>=8 && i<16){
                return (i-8)*50+15;
            }
            else if(i>=16 && i<24){
                return (i-16)*50+15;
            }

        })
        .attr('y',function(d,i){
            if (i<8){
                return 225 + 25 +15;
            }
            else if(i>=8 && i<16){
                return 225+ 75+15;
            }
            else if(i>=16 && i<24){
                return 225 + 125+15;
            }
        })
        .attr('width', 20)
        .attr('height',20)
        .attr('fill',function(d,i){
            if (centerColor != null){
                return centerColor;
            }
            else{
                return d.color;
            }

        })
        .on('click',function(d,i){
            if(centerColor == null){
                centerColor = d3.select(this).attr('fill');
            }
            else {
                centerColor = null;
            }
            drawPalette();

            /*previous = paletteArray.splice(i,1);
            drawPalette();
            drawChart();
            printColors();*/
        })
        .on('mouseover',function(d,i){
            var getColor = nearestColor.from(colors);

            if(typeof d.color === "object"){

                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d3.select(this).attr('fill')).toString()).name);
            }
            else if(d3.select(this).attr('fill').substr(0,1) == "r" || d3.select(this).attr('fill').substr(0,2) == " r") {
                d3.select(this).select("title")
                    .text(getColor(toHex(d3.select(this).attr('fill'))).name);
            }
            else if(d3.select(this).attr('fill').substr(0,1)=="#" || d3.select(this).attr('fill').substr(0,2)==" #" ){
                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d3.select(this).attr('fill')).toString()).name);
            }

        })
        .append("title");;

    if (tempPaletteArray.length != 0){
        generateTempPalette();
    }
    drawTempPalette();
}


function drawTempPalette(){

    g4.selectAll('.tempPaletteBars').remove();

    //console.log(tempPaletteArray);

    g4.selectAll('.tempPaletteBars')
        .data(tempPaletteArray)
        .enter()
        .append('rect')
        .attr('class','tempPaletteBars')
        .attr('x',function(d,i){
            if (i<8){
                return i*57;
            }
            else if(i>=8 && i<16){
                return (i-8)*57;
            }
            else if(i>=16 && i<24){
                return (i-16)*57;
            }

        })
        .attr('y',function(d,i){
            if (i<8){
                return 25 + 225;
            }
            else if(i>=8 && i<16){
                return 83 + 225;
            }
            else if(i>=16 && i<24){
                return 140 + 225;
            }
        })
        .attr('width', 50)
        .attr('height',50)
        .attr('fill',function(d,i){
            return d.color;
        })
        /*.on('click',function(d,i){
            if (d3.event.shiftKey){
                document.getElementById("color1").jscolor.fromString(toHex(d.color).slice(1)); //convert from RGB to hex, cut off # sign
                updateBeginColor(toHex(d.color).slice(1));
            }
            else{
                previous = paletteArray.splice(i,1);
                drawPalette();
                drawChart();
                printColors();
            }
        })*/
        .on('mouseover',function(d,i){
            var getColor = nearestColor.from(colors);

            if(typeof d.color === "object"){

                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d3.select(this).attr('fill')).toString()).name);
            }
            else if(d3.select(this).attr('fill').substr(0,1) == "r" || d3.select(this).attr('fill').substr(0,2) == " r") {
                d3.select(this).select("title")
                    .text(getColor(toHex(d3.select(this).attr('fill'))).name);
            }
            else if(d3.select(this).attr('fill').substr(0,1)=="#" || d3.select(this).attr('fill').substr(0,2)==" #" ){
                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d3.select(this).attr('fill')).toString()).name);
            }

        })
        .append("title");

}

function drawChart(){

    g3.selectAll('.line').remove();

    dataBind = g3.selectAll('lineg')
        .data(paletteArray);

    dataBind.exit().remove();

    lineGroups = dataBind.enter()
        .append('g')
        .attr('class','lineg');

    lineGroups
        .attr("class", "line")
        .attr("d", makeLine)
        .attr('fill','none')
        .attr('stroke',function(d,i){
            return paletteArray[i].color;
        })
        .attr('stroke-width',1);

    lineGroups.append("path")
        .datum(function(d){return d.points})
        .attr("class", "line")
        .attr("d", makeLine)
        .attr('fill','none')
        .attr('stroke',function(d,i){
            return paletteArray[i].color;
        })
        .attr('stroke-width',3)
        .on('click',function(d,i){
            previous = paletteArray.splice(i,1);
            previousTemp = tempPaletteArray.splice(i,1);
            drawPalette();
            drawChart();
            printColors();
        })
        .on('mouseover',function(d,i){
            var getColor = nearestColor.from(colors);
            //d3.select(this).append("svg:title")
            //    .text(getColor(d3.select(this).attr('stroke')).name);

            if(typeof d.color === "object"){

                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d3.select(this).attr('stroke')).toString()).name);
            }
            else if(d3.select(this).attr('stroke').substr(0,1) == "r" || d3.select(this).attr('stroke').substr(0,2) == " r") {
                d3.select(this).select("title")
                    .text(getColor(toHex(d3.select(this).attr('stroke'))).name);
            }
            else if(d3.select(this).attr('stroke').substr(0,1)=="#" || d3.select(this).attr('stroke').substr(0,2)==" #" ){
                d3.select(this).select("title")
                    .text(getColor(d3.rgb(d3.select(this).attr('stroke')).toString()).name);
            }

        })
        .append("title");

}

function updateColor(){

  d3.selectAll('.colorBars1').attr('fill',function(d,i){

      if (document.getElementById("useInterpolate").checked){
          if (reverseColorScale == false){
              scaleColor.range([color1, color2]);
          }
          else if (reverseColorScale == true){
              scaleColor.range([color2, color1]);
          }

      }
      else{
          scaleColor.range([color1, color1]);
      }

      if (sumChecked == false){
          var temp;

          if (centerColor == null){
              temp = d3.lab(color1);//scaleColor(d.column));
          }
          else {
              temp = d3.lab(centerColor);//scaleColor(d.column));
          }

         // temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
          //temp.a = temp.a-aStep*(d.column-(numSteps-1)/2);


          if(interpolate == false){
              temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
              temp.a = temp.a-aStep*(d.column-(numSteps-1)/2);
          }
          else if (interpolate == true){
              temp.l = weight*(temp.l-lightStep*(d.row-(numRows-1)/2)) + (1-weight) * d3.lab(scaleColor(d.column)).l;
              temp.a = weight*(temp.a-aStep*(d.column-(numSteps-1)/2)) + (1-weight) * d3.lab(scaleColor(d.column)).a;
          }


          return temp;
      }
      else {
          var temp;

          if (centerColor == null){
              temp = d3.lab(color1);//scaleColor(d.column));
          }
          else {
              temp = d3.lab(centerColor);//scaleColor(d.column));
          }

          temp.l = (weight * temp.l) + (1-weight) * d3.lab(color2).l;
          temp.a = (weight * temp.a) + (1-weight) * d3.lab(color2).a;
          temp.b = (weight * temp.b) + (1-weight) * d3.lab(color2).b;

          temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
          temp.a = temp.a-aStep*(d.column-(numSteps-1)/2);
          return temp;

      }

  });

    d3.selectAll('.colorBars2').attr('fill',function(d,i){

        if (sumChecked == false){
            var temp;

            if (centerColor == null){
                temp = d3.lab(color1);//scaleColor(d.column));
            }
            else {
                temp = d3.lab(centerColor);//scaleColor(d.column));
            }

            //temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
            //temp.b = temp.b-bStep*(d.column-(numSteps-1)/2);

            if(interpolate == false){
                temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
                temp.b = temp.b-bStep*(d.column-(numSteps-1)/2);
            }
            else if (interpolate == true){
                temp.l = weight*(temp.l-lightStep*(d.row-(numRows-1)/2)) + (1-weight) * d3.lab(scaleColor(d.column)).l;
                temp.b = weight*(temp.b-bStep*(d.column-(numSteps-1)/2)) + (1-weight) * d3.lab(scaleColor(d.column)).b;
            }


            return temp;
        }
        else {

            var temp;

            if (centerColor == null){
                temp = d3.lab(color1);//scaleColor(d.column));
            }
            else {
                temp = d3.lab(centerColor);//scaleColor(d.column));
            }

            temp.l = (weight * temp.l) + (1-weight) * d3.lab(color2).l;
            temp.a = (weight * temp.a) + (1-weight) * d3.lab(color2).a;
            temp.b = (weight * temp.b) + (1-weight) * d3.lab(color2).b;

            //temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
            //temp.b = temp.b-bStep*(d.column-(numSteps-1)/2);

            if(interpolate == false){
                temp.l = temp.l-lightStep*(d.row-(numRows-1)/2);
                temp.b = temp.b-bStep*(d.column-(numSteps-1)/2);
            }
            else if (interpolate == true){
                temp.l = weight*(temp.l-lightStep*(d.row-(numRows-1)/2)) + (1-weight) * d3.lab(scaleColor(d.column)).l;
                temp.b = weight*(temp.b-bStep*(d.column-(numSteps-1)/2)) + (1-weight) * d3.lab(scaleColor(d.column)).b;
            }


            return temp;
        }

    });

    gradientArray.forEach(function(d){
        d.color = scaleColor(d.location);
    });

    g.selectAll('.gradientBars')
        .data(gradientArray)
        .attr('fill',function(d){
            return d.color;
    })

}


function printColors(){

    var colorList = [];

    //console.log(paletteArray, paletteArray[1].color.substr(0,1));

    for(i=0; i<paletteArray.length; i++){

        //console.log(paletteArray[i].color);

        //check whether the color is already in lab format (as an object), in rgb format(generated from palette), or in hex (from text input)
        if(typeof paletteArray[i].color === "object"){
            colorList.push('<br>' + toHex(d3.rgb(paletteArray[i].color).toString()));
        }
        else if(paletteArray[i].color.substr(0,1) == "r" || paletteArray[i].color.substr(0,2) == " r") {
            colorList.push('<br>' + toHex(paletteArray[i].color));
        }
        else if(paletteArray[i].color.substr(0,1)=="#" || paletteArray[i].color.substr(0,2)==" #" ){
            colorList.push('<br>' + paletteArray[i].color);
        }


    }
   document.getElementById('paletteColors').innerHTML = 'Color list:' + colorList.join(';');
}

function updateBeginColor(newColor){

    color1 = '#' + newColor;
    updateColor();
}

function updateEndColor(newColor){

    color2 = '#' + newColor;
    updateColor();

}

function switchInterpolation(value){
    if (document.getElementById("useInterpolate").checked){
        document.getElementById("sumColors").checked = false;
        sumChecked = false;
        interpolate = true;
    }
    else{
        interpolate = false;
    }
    updateColor();
}

function reverseInterpolation(value){
    if (document.getElementById("reverseInterpolation").checked){
        reverseColorScale = true;
    }
    else if (!document.getElementById("reverseInterpolation").checked){
        reverseColorScale = false;
    }

    updateColor();
}

function sumColors(){
    if (document.getElementById("sumColors").checked){

        document.getElementById("useInterpolate").checked = false;
        document.getElementById("reverseInterpolation").checked = false;
        sumChecked = true;
        interpolate = false;
    }
    else{
        sumChecked = false;
    }
    updateColor();
}

function updateBackgroundColor(newColor){

    svg2.style('background', '#' + newColor);
    //svg3.style('background','#' + newColor);
}

function resetBackground(){
    svg2.style('background', '#28354A');
    //svg3.style('background','#28354A');
}

function readdPrevious(){
    if(previous.length > 0){
        paletteArray.push(previous[0]);
        tempPaletteArray.push(previousTemp[0]);
        previous = [];
        drawPalette();
        drawChart();
        printColors();
    }
}

function updateWeight(value){
    weight = value;
    updateColor();
}

function updateLightStep(value){
  lightStep = value;
  updateColor();
}

function updateAStep(value){
    aStep = 200/value;
    updateColor();
}

function updateBStep(value){
    bStep = 200/value;
    updateColor();
}

function clearPalette(){
    paletteArray = [];
    drawPalette();
    drawChart();
    printColors();
}

function textIn(value){
    colorList = value;
    temp = colorList.split(';');
    for (i=0; i<temp.length; i++){
        paletteArray.push( {color: temp[i], points:[Math.random()*10, Math.random()*10,Math.random()*10,Math.random()*10]});
    }
    drawPalette();
    drawChart();
    printColors();

}

function updateAddColor(newColor){

    addColor = '#' + newColor;
    //console.log(addColor);
    generateTempPalette();
}

function generateTempPalette(){
    tempPaletteArray = copy(paletteArray);

    tempPaletteArray.forEach(function(d,i){

        var temp = d3.lab(d.color);

        temp.l = (addWeight * temp.l) + (1-addWeight) * d3.lab(addColor).l;
        temp.a = (addWeight * temp.a) + (1-addWeight) * d3.lab(addColor).a;
        temp.b = (addWeight * temp.b) + (1-addWeight) * d3.lab(addColor).b;

        d.color = temp;
    });

    drawTempPalette();
}

//from https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
function copy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copy(v) : v;
    }
    return output;
}

function updateAddWeight(value){
    addWeight = value;
    document.getElementById('opacityReporter').innerHTML = Math.floor(value*100) + '% opacity (original palette color)';
    generateTempPalette();
}

function toHex(colorString){
    if(typeof colorString === "object"){
        //console.log(toHex(d3.rgb(d.color).toString()).slice(1));
        colorString = d3.rgb(colorString).toString();
    }
    var temp = colorString.split("(")[1].split(")")[0];
    temp = temp.split(",");
    var hexColor = temp.map(function(x){                      //For each array element
        x = parseInt(x).toString(16);      //Convert to a base16 string
        return (x.length==1) ? "0"+x : x; //Add zero if we get only one character
    });
    hexColor = "#"+hexColor.join("");
    return hexColor;
}

function replacePalette(){
    paletteArray = copy(tempPaletteArray);
    tempPaletteArray = [];

    //console.log(tempPaletteArray);

    drawPalette();
    drawTempPalette();
    drawChart();
    printColors();
}