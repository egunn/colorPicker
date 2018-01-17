//adjust the size and position of the SVG to ensure that it has margins around the edge of the screen.
var svg = d3.select("#plot1"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var svg2 = d3.select("#plot2");
//var svg3 = d3.select("#plot3");

var x = d3.scalePoint().rangeRound([0, width]).padding(0.1), //use for categorical axis - divides axis into discrete steps of the right width to fill the axis length
    y = d3.scaleLinear().rangeRound([height, 0]); //continuous scaling of y axis.

var color1 = '#d73027', color2 = '#1a9850';

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //move the group to the right place
var g2 = svg2.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //move the group to the right place
var g3 = svg2.append("g")
    .attr("transform", "translate(" + (margin.left +550) + "," + (margin.top +30) + ")"); //move the group to the right place


var numSteps = 20;
var numRows = 15;
var hue, saturation,value;
var type;
var colorArray = [];
var rectsArray1 = [];
var rectsArray2 = [];
var paletteArray = [];
var lightStep = 8;
var aStep = 200/numSteps;
var bStep = 200/numSteps;
var previous = [];

//l = 0-200; a = -100-100; b = -100-100;

var scaleColor = d3.scaleLinear()
    .domain([1,numSteps]).range(['#d73027', '#1a9850']).interpolate(d3.interpolateLab);

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

//scaleLinear().domain(new Array(10));

console.log(scaleColor(10));

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


    console.log(d3.lab(scaleColor(10)));//.darker()

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

          var temp = d3.lab(scaleColor(d.column));
          temp.l = temp.l-lightStep*(d.row-numRows/2);
          temp.a = temp.a-lightStep*(d.column-aStep);
          return temp;

          //var temp = d3.lab(scaleColor(d.column));
          //temp.l = temp.l-lightStep*(d.row-numRows/2);
          //return temp;

          /*if (d.row < numRows/2){
              return d3.lab(scaleColor(d.column)).darker((-d.row + numRows/2)/2);
          }
          else if (d.row > numRows/2) {
            var temp = d3.lab(scaleColor(d.column));
            temp.l = temp.l-2;
              return temp;//d3.lab(scaleColor(d.column)).brighter((d.row - numRows/2)/2);
          }
          else{
              return d3.lab(scaleColor(d.column))
          }*/
      })
      .on('click', function(d){
          //console.log(d3.select(this).attr('fill'));
          paletteArray.push({color: d3.select(this).attr('fill'), points:[Math.random()*10, Math.random()*10,Math.random()*10,Math.random()*10]});

          drawPalette();
          drawChart();
          printColors();
      });


    g.selectAll('.colorBars2')
        .data(rectsArray2)//colorArray)
        .enter()
        .append('rect')
        .attr('class','colorBars2')
        .attr('x',function(d,i){
            return d.column*23 + 485;
        })
        .attr('y',function(d,i){
            return d.row*27;
        })
        .attr('width', 20)
        .attr('height',20)
        .attr('fill',function(d,i){

            var temp = d3.lab(scaleColor(d.column));
            temp.l = temp.l-lightStep*(d.row-numRows/2);
            temp.b = temp.b-lightStep*(d.column-bStep);
            return temp;

            //var temp = d3.lab(scaleColor(d.column));
            //temp.l = temp.l-lightStep*(d.row-numRows/2);
            //return temp;
        })
        .on('click', function(d){
            //console.log(d3.select(this).attr('fill'));

            paletteArray.push({color: d3.select(this).attr('fill'), points:[Math.random()*10, Math.random()*10,Math.random()*10,Math.random()*10]});

            drawPalette();
            drawChart();
            printColors();
        });

}


function drawPalette() {

    g2.selectAll('*').remove();

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
            previous = paletteArray.splice(i,1);
            drawPalette();
            drawChart();
            printColors();
        });


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
            previous = paletteArray.splice(i,1);
            drawPalette();
            drawChart();
            printColors();
        });
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
            drawPalette();
            drawChart();
            printColors();
        });

}

function updateColor(){
  d3.selectAll('.colorBars1').attr('fill',function(d,i){
      var temp = d3.lab(scaleColor(d.column));
      temp.l = temp.l-lightStep*(d.row-numRows/2);
      temp.a = temp.a-aStep*(d.column-aStep);
      //temp.b = temp.b-lightStep*(d.column-numSteps/2);
      return temp;
  });

    d3.selectAll('.colorBars2').attr('fill',function(d,i){
        var temp = d3.lab(scaleColor(d.column));
        temp.l = temp.l-lightStep*(d.row-numRows/2);
        temp.b = temp.b-lightStep*(d.column-bStep);
        return temp;
    });
}


function printColors(){

    var colorList = [];

    for(i=0; i<paletteArray.length; i++){

        colorList.push('<br>' + paletteArray[i].color);
    }
   document.getElementById('paletteColors').innerHTML = 'Color list:' +colorList;
}

function updateBeginColor(newColor){

  color1 = '#' + newColor;
  scaleColor.range([color1, color1]);

  updateColor();
}

function updateEndColor(newColor){

    color2 = '#' + newColor;
    if (document.getElementById("useInterpolate").checked){
        scaleColor.range([color1, color2]);
    }
    else{
        scaleColor.range([color1, color1]);
    }
    updateColor();
}

function switchInterpolation(value){
    if (document.getElementById("useInterpolate").checked){
        scaleColor.range([color1, color2]);
    }
    else{
        scaleColor.range([color1, color1]);
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
        previous = [];
        drawPalette();
        drawChart();
        printColors();
    }
}

function updateLightStep(value){
  console.log(value);
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