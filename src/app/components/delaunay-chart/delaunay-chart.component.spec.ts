import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DelaunayChartComponent } from './delaunay-chart.component';
import * as d3 from 'd3';

describe('DelaunayChartComponent', () => {
  let component: DelaunayChartComponent;
  let fixture: ComponentFixture<DelaunayChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelaunayChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelaunayChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const svgElement = fixture.nativeElement.querySelector('svg');
    expect(svgElement).toBeTruthy();
  });

  it('should render points and triangles', () => {
    const svgElement = d3.select(fixture.nativeElement).select('svg');
    const circles = svgElement.selectAll('circle').nodes();
    const paths = svgElement.selectAll('path').nodes();

    expect(circles.length).toBeGreaterThan(0);
    expect(paths.length).toBeGreaterThan(0);
  });
});