/**
 * Created by bubble on 26.05.16.
 */
import {Component, OnInit, ViewEncapsulation} from 'angular2/core';
import * as d3 from 'd3';
// import * as topojson from 'ts-topojson';
const topojson = require('ts-topojson');

@Component({
  selector: 'map',
  template: `
<div id="map_district">
  <div id="textbox"></div>
  <svg viewBox="0 0 900 600"></svg>
</div>`,
  styleUrls: ['app/components/map/map.css'],
  encapsulation: ViewEncapsulation.None
})
export class Map implements OnInit{
  ngOnInit(){
    this.displayFunc();
  }

  displayFunc(){
    var width = 900,
      height = 600,
      centered;

    var geometry_center = {"latitude": 48.360833, "longitude": 31.1809725};

    var svg = d3.select("svg");

    var projection = d3.geo.conicEqualArea()
      .center([0, geometry_center.latitude])
      .rotate([-geometry_center.longitude, 0])
      .parallels([46, 52])
      .scale(4000)
      .translate([width / 2, height / 2]);

    var path = d3.geo.path()
      .projection(projection);

    var topo_data = null;

    d3.json("app/components/map/ukraine.json", function (error, ukraine_data) {
      topo_data = ukraine_data;

      var countries = topojson.feature(ukraine_data, ukraine_data.objects.countries);
      d3.select("svg").selectAll(".country")
        .data(countries.features)
        .enter().append("path")
        .attr("class", function (d) {
          return "country " + d.id;
        })
        .attr("d", path);

      d3.select("svg").append("path")
        .datum(topojson.mesh(ukraine_data, ukraine_data.objects.countries, function (a, b) {
          return a !== b;
        }))
        .attr("class", "country-boundary")
        .attr("d", path);
      d3.select("svg").append("path")
        .datum(topojson.mesh(ukraine_data, ukraine_data.objects.countries, function (a, b) {
          return a === b;
        }))
        .attr("class", "coastline")
        .attr("d", path);

      var water_group = d3.select("svg").append("g")
        .attr("id", "water-resources");

      var rivers = topojson.feature(ukraine_data, ukraine_data.objects.rivers);
      water_group.selectAll(".river")
        .data(rivers.features)
        .enter().append("path")
        .attr("class", "river")
        .attr("name", function (d) {
          return d.properties.name;
        })
        .attr("d", path)
      ;

      // Add lakes after rivers so that river lines connect reservoirs, not cross them.
      var lakes = topojson.feature(ukraine_data, ukraine_data.objects.lakes);
      water_group.selectAll(".lake")
        .data(lakes.features)
        .enter().append("path")
        .attr("class", "lake")  // Note: not necessary a lake, it can be a reservoir.
        .attr("name", function (d) {
          return d.properties.name;
        })
        .attr("d", path);

      var regions = topojson.feature(ukraine_data, ukraine_data.objects.regions);
      d3.select("svg").selectAll(".region")
        .data(regions.features)
        .enter().append("path")
        .classed("region", true)
        .attr("id", function (d) {
          return d.id;
        })
        .attr("d", path)
        .on("mouseover", function (d) {
          highlightRegion(d.id);
          d3.event.stopPropagation();
          var prop = d.properties;
          var string = "<p><strong>Область: </strong>" + prop.localized_name.ua + "</p>";
          d3.select("#textbox")
            .html("")
            .append("text")
            .html(string);
        });

      d3.select("svg").append("path")
        .datum(topojson.mesh(ukraine_data, ukraine_data.objects.regions, function (a, b) {
          return a !== b;
        }))
        .classed("region-boundary", true)
        .attr("d", path)
      ;

      d3.select("#map_district").append("ul")
        .classed("regions-list", true)
        .selectAll("a")
        .data(regions.features.sort(function (a, b) {
          return a.properties.localized_name.ua.localeCompare(b.properties.localized_name.ua);
        }))
        .enter().append("li").append("a")
        .text(function (d) {
          return d.properties.localized_name.ua;
        })
        .attr("href", "javascript:void(0)")
        .on("click", function (d) {
          highlightRegion(d.id);
          d3.event.stopPropagation();
        });
      window.addEventListener("click", clearRegionHighlight);
    });

    function clearRegionHighlight() {
      d3.select("svg").select(".region.selected")
        .classed("selected", false);
      d3.select("svg").select(".region-boundary.selected")
        .remove();
    }

    function highlightRegion(regionId) {
      clearRegionHighlight();
      d3.select("svg").select("#" + regionId)
        .classed("selected", true);
      d3.select("svg").append("path")
        .datum(topojson.mesh(topo_data, topo_data.objects.regions, function (a, b) {
          return (a.id === regionId) || (b.id == regionId);
        }))
        .classed({"region-boundary": true, "selected": true})
        .attr("d", path);
    }

    d3.select(self.frameElement)
      .style("width", width + "px")
      .style("height", "800px");
  }
}
