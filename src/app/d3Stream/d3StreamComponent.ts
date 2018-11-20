import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import * as moment from 'moment';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { forEach } from '@angular/router/src/utils/collection';

interface ChartData {
  date: any,
  duration: number
}
// {date:'Tue Nov 13 2018 00:00:00 GMT-0600 (CST)', effort:1},


@Component({
  selector: 'app-d3Stream',
  templateUrl: './d3Stream.component.html',
  styleUrls: ['./d3Stream.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class d3StreamComponent implements OnInit, OnChanges {
  @ViewChild('stream') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() width: number;
  @Input() height: number;
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  private margin: any = { top: 20, bottom: 40, left: 20, right: 20 };
  private chart: any;

  //private width: number;
  //private height: number = 100;

  private xScale: any;
  private yScale: any;
  private colors: any;//delete
  private color: any;
  private xAxis: any;
  private yAxis: any;
  private tooltip: any;
  private hyperlink: any;
  private maxArr: number;
  private scaleUp = 5;
  private nest: any;
  private nestMax: any = 0;
  private test: any;

  //private xDomain: Date;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }


  ngOnInit() {

    console.log('duration as a number?', this.data)

    //0: Object { start: "Fri Nov 02 2018 00:00:00 GMT-0500 (CDT)", allDay: true, Duration: 30 }
    // to do (1) nest my month, nest by week? 
    // start change to month
    //start change to week?

    let self = this;
    let d3 = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    let tooltipDiv: Selection<HTMLElement, any, null, undefined>;
    let tooltipA: Selection<HTMLElement, any, null, undefined>;
    let d3Svg: Selection<SVGSVGElement, any, null, undefined>;

    //let d3G: Selection<SVGGElement, any, null, undefined>;

    let width: number;
    let height: number;

    if (this.parentNativeElement !== null && this.data) {
      d3ParentElement = d3.select(this.parentNativeElement);
      d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');
      width = +this.width - this.margin.left - this.margin.right;
      height = +this.height - this.margin.top - this.margin.bottom;

      d3Svg
        .attr("width", width + this.margin.left + this.margin.right)
        .attr("height", height + this.margin.top + this.margin.bottom);



      // chart plot area
      this.chart = d3Svg.append<SVGGElement>('g')
        .attr('class', 'bars')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);



      // define X & Y domains
      let xDomain: any = d3.extent(this.data, function (d) { return new Date(d['date']) });

      //let xDomain = d3.keys(this.sortByCode(this.fromParentData));
      let yDomain = [0, 6];

      // create scales

      //this.xScale = d3.scaleTime().range([0, this.width]);//.domain(xDomain)
      this.xScale = d3.scaleTime().domain(xDomain).range([0, this.width]);
      this.yScale = d3.scaleLinear().range([this.height, 0]);//domain(yDomain).

      /*   this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, width]);
      
           this.yScale = d3.scaleLinear().domain(yDomain).range([height, 0]); */

      // bar colors
      this.color = d3.scaleOrdinal().range(d3.schemeCategory10);


      var UserIds = d3.nest()
        .key(d => { return d['UserId']; })
        .entries(this.data);

      UserIds.forEach(function (s) {
        s['max'] = d3.max(s.values, function (d) { return d['effort']; });
        s.values.map(res => res['max'] = s['max']);
      });



      //console.log('UserIds:', UserIds, 'this.data:', this.data)



      /*
  
      let update1 = this.chart.selectAll('.bar')
  
        .data(d3.entries(this.sortByCode(this.fromParentData)), function (d) {return d.key; })
  
        .enter()
  
        .append("g")
  
        .classed("UserId", true);
  
   
  
      let update = update1.selectAll('g')
  
        .data(function (d) { return d.value})
  
        .enter()
  
        .append("g")
  
        .classed("priority", true);
  
   
  
        update
  
        .append("rect")
  
      */



      let svg3 = this.chart.selectAll("g.UserId")
        .data(d3.entries(UserIds), function (d) { return d.key; })//, ,function (d) { return d.values }
        .enter().append("g")
        .classed("UserId", true);

      let svg4 = svg3.selectAll("g")
        .data(d3.entries(UserIds), function (d) { return d.values })//, ,function (d) { return d.values }
        .enter().append("g")
        .classed("key", true);

      /*
   
       let svg5 = svg4
   
       .selectAll("g.key")
   
       .data([{due:new Date(), effort:4},{due:new Date(), effort:4},{due:new Date(), effort:4}])//, ,function (d) { return d.values }
   
       .enter().append("path")
   
       .classed("values", true)
   
       .attr("d", (d:any)=> {  this.yScale.domain([0,d['max']]); return line3(d); });
   
    
   
   console.log(d);     let area3 = d3.area()
   
         .x((d:any)=>{ return this.xScale(new Date(d['due'])); })
   
         .y0(this.height)
   
         .y1((d:any)=> { return this.yScale(d['effort']) }); */



      // Add the line path elements. Note: the y-domain is set per element.

      let line3 = d3.line<any>()
        .x((d: any) => { return this.xScale(new Date(d['date'])); })
        .y((d: any) => { return this.yScale(d['effort']) });


      // Add the area path elements. Note: the y-domain is set per element.

      /*     svg4.selectAll("g")
      
          .data(UserIds, function (d) { return d.values })
      
          .enter()
      
          .append("path")
      
            .attr("class", "line")
      
            .attr("d", (d:any)=> { this.yScale.domain([0,d['max']]); return line3(d); }); */

      // x & y axis

      this.xAxis = d3Svg.append<SVGGElement>('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top + height})`)
        .call(d3.axisBottom(this.xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .style("fill", "black")
        .attr("dx", 0.8)
        .attr("dy", 8)
        .attr("transform", "translate(0,0) rotate(-45)");

      this.yAxis = d3Svg.append<SVGGElement>('g')
        .attr('class', 'axis axis-y')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3.axisLeft(this.yScale))
    }

    //this.createChart();
    //this.updateChart();

    //}

  }



  ngOnChanges() {

    if (this.chart) {

      //this.updateChart();

      //this.calculateYmax(this.data)

    }

  }



  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    console.log('element.offsetHeight', element.offsetWidth, element.offsetHeight, this.margin)


    let svg = d3.select(element).append('svg')
      .attr('width', this.width)//element.offsetWidth
      .attr('height', this.height);//element.offsetHeight

    // chart plot area

    this.chart = svg.append('g')
      .attr('class', 'UserIds')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    var UserIds = d3.nest()
      .key(d => { return d['UserId']; })
      .entries(this.data);

    // define X & Y domains
    let xDomain = d3.extent(this.data, function (d) { return new Date(d['date']) });

    //let yDomain = [0, 5];//Object(this.nestMax).value



    this.xScale = d3.scaleTime().range([0, this.width]);//.domain(xDomain)
    this.yScale = d3.scaleLinear().range([this.height, 0]);//domain(yDomain).

    //console.log('yDomain is ',yDomain, this.yScale('2'));

    // Compute the maximum price per symbol, needed for the y-domain.



    UserIds.forEach(function (s) {
      s['max'] = d3.max(s.values, function (d) { return d['effort']; });
      s.values.map(res => res['max'] = s['max']);
    });



    //console.log('max is',_.maxBy(UserIds, 'max'));



    /*   // Define the line
    
    let valueLine = d3.line<ChartData>()
    
    .x((d: ChartData) => { return this.xScale(new Date(d['name'])) })//new Date(1000 * parseInt(cards[key1]['id'].substring(0, 8), 16)).getMonth()
    
    .y((d: ChartData) => { return this.yScale(d['y'])  })
    
    .curve(d3.curveBasis);
    
     
    
    let area = d3.area()
    
    .x((d: any) => { return this.xScale(new Date(d['name'])); })
    
    .y0((d: any) =>  { return this.yScale(d['y0']); })
    
    .y1((d: any) =>  { return this.yScale(d['y0'] + d['y']); }); //d.y0 + d.y */



    let svg3 = this.chart.selectAll("g.UserId")
      .data(UserIds)//, ,function (d) { return d.values }
      .enter().append("g")
      .classed("UserId", true);


    // Add an SVG element for each symbol, with the desired dimensions and margin.

    /*   var svg3 = d3.select(element).selectAll("svg")
    
      .data(UserIds)
    
    .enter().append("svg")
    
      .attr("width", this.width + this.margin.left + this.margin.right)
    
      .attr("height", this.height + this.margin.top + this.margin.bottom)
    
    .append("g")
    
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")"); */



    let area3 = d3.area()
      .x((d: any) => { return this.xScale(new Date(d['date'])); })
      .y0(this.height)
      .y1((d: any) => { return this.yScale(d['effort']) });



    // Add the line path elements. Note: the y-domain is set per element.

    let line3 = d3.line<any>()
      .x((d: any) => { return this.xScale(new Date(d['date'])); })
      .y((d: any) => { return this.yScale(d['effort']) });



    // Add the area path elements. Note: the y-domain is set per element.

    svg3.selectAll("path")
      .data(function (d) { return d.values })
      .enter()
      .append("path")
      .attr("class", "area")
      .attr("d", (d: any) => { this.yScale.domain([0, d['max']]); console.log('svg3.selectAll("path") is...', d, this.yScale(d['effort'])); return area3(d); });

    //this.yScale.domain([0, d['max']]);

    svg3.append("path")

      .attr("class", "line")

      .attr("d", (d: any) => { this.yScale.domain([0, d['max']]); return line3(d); });

    //this.yScale.domain([0, d['max']]);











    // Add a small label for the symbol name.

    /* svg3.append("text")
    
      .attr("x", this.width - 6)
    
      .attr("y", this.height - 6)
    
      .style("text-anchor", "end")
    
      .text(d=> { return d['key']; }); */



    /* var stack = d3.stack().keys(d3.keys(UserIds))
    
    .order(d3.stackOrderNone)
    
    .offset(d3.stackOffsetNone);
    
    */

    //console.log('UserIds obj',d3.values(UserIds));//.map(res=>res['effort']))

    //stack.keys(data.columns.slice(1))(data)

    //.value(d3.values(UserIds).map(res=>res['effort']))

    //stack.keys(data.columns.slice(1))(data)

    ///let stack1 = d3.stack().value(d3.keys(UserIds).map(res=>res)).offset(d3.stackOffsetWiggle);



    ///console.log("stack???",d3.values(UserIds),stack1( this.data));



    //var layers = stack(d3.values(UserIds)(this.data));

    this.nest = d3.nest()
      .key(function (d: any) { return d.UserId; })
      .key(function (d: any) { return d.date }).sortKeys(d3.ascending)
      .entries(this.data)
      .map(function (d) {
        let tempArr = [];
        var group = d.key;//UserId
        let effort: any;
        d.values.map(function (dd, i) { //UserId values...
          let y: number = 0;
          let y0: number = 0;
          dd.values.map(function (ddd, i) {//due values....

            effort = + ddd['effort'];

            y0 = y;

            y = (ddd['effort'] > 0) ? y0 + ddd['effort'] : y0 + 1;

            tempArr.push({ UserId: d.key, name: dd.key, y0: y0, y: y })//UserId:d.key,name: dd.key,

          })

          return tempArr

        })



        return {

          'name': group,

          'series': tempArr,

        };

      })



    /*  var obj = {};
    
    this.nest.forEach(function (d:any) {
    
      obj[d.name] = d.series;
    
    });  */



    //console.log('this nest is it sorted??', this.nest);



    this.nestMax = d3.nest()

      .key(function (d: any) { return d.date })

      .rollup(function (d: any) { return d3.max(d, function (d: any) { return d['effort'] }) as any })

      .entries(this.data);



    this.nestMax = _.maxBy(this.nestMax, 'value');



    this.color = d3.scaleOrdinal().range(d3.schemeCategory10);



    // x & y axis

    this.xAxis = svg.append('g')

      .attr('class', 'axis axis-x')

      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)

      .call(d3.axisBottom(this.xScale))

      .selectAll("text")

      .style("text-anchor", "end")

      .attr("dx", 0.8)

      .attr("dy", 8)

      .attr("transform", "translate(0,0) rotate(-45)");



    this.yAxis = svg.append('g')

      .attr('class', 'axis axis-y')

      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    //.call(d3.axisLeft(this.yScale));



    // add the tooltip area to the webpage

    this.tooltip = d3.select(element).append("div")

      .attr("class", "tooltip")

      .style("opacity", 0);



    this.hyperlink = d3.select(element).append("div")

      .attr("class", "tooltip")

      .style("opacity", 1);

  }



  updateChart() {

    // define X & Y domains

    let xDomain = [new Date(), d3.max(this.data, function (d) { return new Date(d['date']) })];

    let yDomain = [0, 50];//Object(this.nestMax).value



    // update scales & axis

    this.xScale = d3.scaleTime().domain(xDomain).range([0, this.width]);

    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);



    this.xAxis.transition().call(d3.axisBottom(this.xScale));

    this.yAxis.transition().call(d3.axisLeft(this.yScale));



    // Define the line

    let valueLine = d3.line<ChartData>()

      .x((d: ChartData) => { return this.xScale(new Date(d['name'])) })//new Date(1000 * parseInt(cards[key1]['id'].substring(0, 8), 16)).getMonth()

      .y((d: ChartData) => { return this.yScale(d['y']) })

      .curve(d3.curveBasis);



    let area = d3.area()

      .x((d: any) => { return this.xScale(new Date(d['name'])); })

      .y0((d: any) => { return this.yScale(d['y0']); })

      .y1((d: any) => { return this.yScale(d['y0'] + d['y']); }); //d.y0 + d.y



    let UserIds = this.chart.selectAll("g.UserId")

      .data(this.nest, function (d) { return d.series })//, ,function (d) { return d.values }

      .enter().append("g")

      .classed("UserId", true);



    //this.chart.selectAll("path.line").data(this.nest, function(d) { return d.key; })

    UserIds

      //.selectAll('path.line').data(function (d) { return d.series })

      //.enter()

      .append('path')

      .attr('class', 'line')

      .style('stroke', d => { return this.color(d['name']) })//

      .attr('d', function (d) { return area(d.series); })//d.series

      .style("fill", d => { return this.color(d['name']) });



    var legend = this.chart.selectAll(".legend")

      .data(this.color.domain().slice().reverse())

      .enter().append("g")

      .attr("class", "legend")

      .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });



    legend.append("rect")

      .attr("x", this.width - 18)

      .attr("width", 18)

      .attr("height", 18)

      .style("fill", this.color);



    legend.append("text")

      .attr("x", this.width - 24)

      .attr("y", 9)

      .attr("dy", ".35em")

      .style("text-anchor", "end")

      .text(function (d) { return d; });



    /* var t = this.chart.append('table').classed('table',true) ;
    
    var tr = t.selectAll('tr')
    
    .data(this.nest, function(d){return d.key})
    
    .enter()
    
    .append('tr')
    
    .append('td')
    
    .text("hi"); */



  }

}



/*

var multi1 = [

  {

    "name": "Germany",

    "series": [

      {

        "name": "2010",

        "value": 7300000

      },

      {

        "name": "2011",

        "value": 8940000

      }

    ]

  },

 

[

  {

    "name": "Cheng En Lai",

    "series": [

      {

        "UserId": "Cheng En Lai",

        "date": "2017-09-29",

        "value": 2

      },

      {

        "UserId": "Cheng En Lai",

 

[

  {

    "name": "Cameroon",

    "series": [

      {

        "value": 6171,

        "name": "2016-09-21T18:19:18.969Z"

      },

      {

        "value": 3876,

        "name": "2016-09-17T15:48:25.477Z"

      },

 

*/



/*   var area = d3.area()

                .x(function(d) { return this.xScale(d['key']); })

                .y0(function(d) { return this.yScale(d['y0']); })

                .y1(function(d) { return this.yScale(d['y0'] + d['y']); });

*/