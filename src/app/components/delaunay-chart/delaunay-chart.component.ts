import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import Delaunator from 'delaunator';

@Component({
  selector: 'app-delaunay-chart',
  standalone: true,
  imports: [],
  templateUrl: './delaunay-chart.component.html',
  styleUrl: './delaunay-chart.component.css'
})
export class DelaunayChartComponent implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const svg = d3.select(this.el.nativeElement).select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const centerX = width / 2;
    const centerY = height / 2;

    // Definindo o filtro de sombra
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'shadow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    filter.append('feDropShadow')
      .attr('dx', 1)
      .attr('dy', 1)
      .attr('stdDeviation', 2)
      .attr('flood-color', 'black')
      .attr('flood-opacity', 0.5);

    const points: [number, number][] = d3.range(100).map(() => {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.sqrt(Math.random()) * Math.min(width, height) / 2;
      return [
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      ];
    });

    const delaunay = Delaunator.from(points);

    const triangles = delaunay.triangles;
    const coords = delaunay.coords;

    for (let i = 0; i < triangles.length; i += 3) {
      const x1 = coords[2 * triangles[i]], y1 = coords[2 * triangles[i] + 1];
      const x2 = coords[2 * triangles[i + 1]], y2 = coords[2 * triangles[i + 1] + 1];
      const x3 = coords[2 * triangles[i + 2]], y3 = coords[2 * triangles[i + 2] + 1];

      svg.append('path')
        .attr('d', `M${x1},${y1}L${x2},${y2}L${x3},${y3}Z`)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('filter', 'url(#shadow)'); // Aplicando o filtro de sombra
    }

    svg.selectAll('circle')
      .data(points)
      .enter().append('circle')
      .attr('cx', d => d[0])
      .attr('cy', d => d[1])
      .attr('r', 3)
      .attr('fill', 'blue');
  }
}