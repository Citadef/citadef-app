import { memo } from "react";
import { useHistory } from "react-router-dom";

class GroovyFish {
    /** Sand id for path names, not to have two fishes with the same pathname if a fish is generated twice in the same page */
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    constructor(seed_func, seed_num) {
        let sandSize = 1000000;

        this.seed = seed_func;
        this.clip_path_name = "fish_" + seed_num + "_clip" + this.getRandomInt(sandSize).toString();
        this.rand = this.sfc32(this.seed(), this.seed(), this.seed(), this.seed());
    }

    /** PRNG **/
    sfc32(a, b, c, d) {
        return function() {
            a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
            var t = (a + b) | 0;
            a = b ^ b >>> 9;
            b = c + (c << 3) | 0;
            c = (c << 21 | c >>> 11);
            d = d + 1 | 0;
            t = t + d | 0;
            c = c + t | 0;
            return (t >>> 0) / 4294967296;
        }
    }

    draw(svg, size, frame) {
        let r = size/3.5;
        let points_num = Math.round(8+this.rand()*4);

        let points = this.randomPointsNearCircle(points_num, size/2, size/2, r);

        // fish colors
        let pastel1 = this.getPastelColor();
        let pastel2 = this.getPastelColor();
        let pattern_color1 = this.getColor();
        let pattern_color2 = this.getColor();


        if (frame == "rectangle") 
            svg = this.rectangle(0.05*size, 0.05*size, 0.9*size, 0.9*size, svg);

        svg = this.addMultyBezier(points, svg, this.clip_path_name);

        svg = this.drawPatterns(pastel1, pattern_color1, pastel2, pattern_color2, svg, this.clip_path_name, r/3);

        // eye and eye ball
        svg = this.circle(points[0].x, points[0].y, r/3 + this.rand()*10, svg, this.getColor(), this.clip_path_name);
        svg = this.circle(points[0].x-r/12, points[0].y, r/13, svg, "black", this.clip_path_name);
        svg = this.circle(points[0].x-r/12, points[0].y, r/30, svg, "white", this.clip_path_name);

        return svg;

    }

    circle(x, y, r, svg, color="black", clip_path="") {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', r);

        circle.setAttribute('fill', color);
        circle.setAttribute('stroke', 'black');

        if (clip_path != "")
            circle.setAttribute('clip-path', 'url(#' + clip_path + ')');

        svg.appendChild(circle);

        return svg;
    }

    rectangle(x, y, width, height, svg) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        let colorfill = this.getColor();
        let colorstroke = this.getBrightColor();

        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("style", "fill:" + colorfill + ";stroke:" + colorstroke + ";stroke-width:10;fill-opacity:1;stroke-opacity:1");

        svg.appendChild(rect);

        return svg;
    }

    addMultyBezier(points, svg, clip_path_name) {
        var bezier = document.createElementNS("http://www.w3.org/2000/svg", "path");    

        let m1 = points[0].x + 10;
        let m2 = points[0].y + 10;

        let d = "M " + m1 + " " + m2 + " ";
        d = d + "Q " + points[0].x + " " + points[0].y + " " + points[1].x + " " + points[1].y + " ";

        for (let i=2; i<points.length; i++) {
          d = d + "T " + points[i].x + " " + points[i].y + " ";
        }
        d = d + "Z";

        bezier.setAttribute('d', d);
        bezier.setAttribute('stroke', 'black');
        bezier.setAttribute('fill', 'transparent');
        bezier.setAttribute('fill', this.getBrightColor());

        svg.appendChild(bezier);

        // create clip path
        var clip_path =  document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
        clip_path.id = clip_path_name;

        var bezier_clip = document.createElementNS("http://www.w3.org/2000/svg", "path");    
        bezier_clip.setAttribute('d', d);
        clip_path.appendChild(bezier_clip);

        svg.appendChild(clip_path);

        return svg;

      }

    randomPointsNearCircle(points_num, origin_x, origin_y, r) {
        let points = new Array(points_num);

        for (let i=0; i<points_num; i++) {
          let point = (i*2*Math.PI)/points_num;
          let r_with_noise = r + this.rand()*(r/2);
          let x = r_with_noise*Math.cos(point) + origin_x;
          let y = r_with_noise*Math.sin(point) + origin_y;

          points[i] = new Object();
          points[i].x = x;
          points[i].y = y;
        }

        return points;

    }


    // Pattern functions
    //================================================== 
    drawPatterns(pastel1, pattern_color1, pastel2, pattern_color2, svg, clip_path_name, triangle_side) {
        let x= triangle_side;
        let y1 = Math.sqrt(3/4*(x*x));
        let y2 = x/2;


        for (let i=0; i<9; i++) {
            for (let j=0; j<6; j++) {
                svg = this.addTriangleUsingPath(0 + x*i, y1*2*j, x + x*i, y1*2*j, y2 + x*i, y1*2*j+y1, triangle_side, pastel1, pattern_color1, svg, clip_path_name);
                svg = this.addTriangleUsingPath(x + x*i, y1*2*j, y2 + x*i, y1*2*j+y1, x+y2 + x*i, y1*2*j+y1, triangle_side, pastel2, pattern_color2, svg, clip_path_name);
                svg = this.addTriangleUsingPath(y2 + x*i, y1*2*j+y1, x+y2 + x*i, y1*2*j+y1, x + x*i, y1*2*(j+1), triangle_side, pastel1, pattern_color1, svg, clip_path_name);
                svg = this.addTriangleUsingPath(x+y2 + x*i, y1*2*j+y1, x + x*i, y1*2*(j+1), 2*x + x*i, y1*2*(j+1), triangle_side, pastel2, pattern_color2, svg, clip_path_name);
            }
        }

        return svg;
    }

    addTriangleUsingPath(x1, x2, y1, y2, z1, z2, triangle_side, color, pattern_color, svg, clip_path_name) {
        var triangle_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d="M" + x1 +", " + x2 + "  " + y1 + ", " + y2 + " " + z1 + ", " + z2 + "z";
        

        triangle_path.setAttribute("d", d);

        triangle_path.setAttribute("fill", color);
        triangle_path.setAttribute('clip-path', 'url(#' + clip_path_name + ')');

        // svg.appendChild(triangle_path);

        let slope = ((y2-x2)/(y1-x1));
        
        let xm1 = x1 + (y1-x1)/4;
        let ym1 = slope*(xm1 - x1) + x2;

        let xm2 = x1 + 3*(y1-x1)/4;
        let ym2 = slope*(xm2 - x1) + x2;

        svg = this.circle(xm1, ym1, 1, svg, color, clip_path_name);
        svg = this.circle(xm2, ym2, 1, svg, color, clip_path_name);

        let points = new Array(4);

        for (let i=0; i<4; i++) {
          points[i] = new Object();
        }

        points[0].x = xm1;
        points[0].y = ym1;

        [points[1].x, points[1].y] = this.randomPointinTriangle(x1, x2, y1, y2, z1, z2);
        [points[2].x, points[2].y] = this.randomPointinTriangle(x1, x2, y1, y2, z1, z2);

        points[3].x = xm2;
        points[3].y = ym2;

        svg = this.circle(xm1, ym1, triangle_side/8, svg, this.getColor(), clip_path_name);
        svg = this.circle(xm2, ym2, triangle_side/8, svg, this.getColor(), clip_path_name);
        svg = this.circle(points[2].x, points[2].y, triangle_side/8, svg, this.getColor(), clip_path_name);
        svg = this.circle(points[1].x, points[1].y, triangle_side/8, svg, this.getColor(), clip_path_name);

        svg = this.addMultyBezier_pattern(points, pattern_color,svg, clip_path_name);

        return svg;
    }

    addMultyBezier_pattern(points, pattern_color,svg, clip_path_name) {
        var bezier = document.createElementNS("http://www.w3.org/2000/svg", "path");    


        let d = "M " + points[0].x + " " + points[0].y + " ";
        d = d + "Q " + points[0].x + " " + points[0].y + " " + points[1].x + " " + points[1].y + " ";

        for (let i=2; i<points.length; i++) {
          d = d + "T " + points[i].x + " " + points[i].y + " ";
        }
        // d = d + "Z";

        bezier.setAttribute('d', d);
        bezier.setAttribute('stroke', 'black');
        bezier.setAttribute('fill', pattern_color);
        bezier.setAttribute('clip-path', 'url(#' + clip_path_name + ')');

        svg.appendChild(bezier);    

        return svg;
    }

    randomPointinTriangle(x1, x2, y1, y2, z1, z2) {
        var t1 = this.rand();
        var t2 = this.getRandomArbitrary(0, 1-t1);

        let in_x = t1*x1 + t2*y1 + (1-t1-t2)*z1;    
        let in_y = t1*x2 + t2*y2 + (1-t1-t2)*z2;

        return [in_x, in_y];
    }

    getRandomArbitrary(min, max) {
        return this.rand() * (max - min) + min;
    }

    // Colors functions
    //================================================== 
    getColor(){ 
        let color = Math.floor(this.rand()*16777215).toString(16);
        if (color.length == 4)
            color = color + "00";

        if (color.length == 5)
            color = color + "0";

        return '#' + color;
    }
    getBrightColor(){ 
        let color =  this.getColor();


        let stripped_color = color.substring(1);      // strip #
        let rgb = parseInt(stripped_color, 16);   // convert rrggbb to decimal
        let r = (rgb >> 16) & 0xff;  // extract red
        let g = (rgb >>  8) & 0xff;  // extract green
        let b = (rgb >>  0) & 0xff;  // extract blue

        let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        while (luma < 110) {
            color =  this.getColor();

            stripped_color = color.substring(1);      // strip #
            
            rgb = parseInt(stripped_color, 16);   // convert rrggbb to decimal
            r = (rgb >> 16) & 0xff;  // extract red
            g = (rgb >>  8) & 0xff;  // extract green
            b = (rgb >>  0) & 0xff;  // extract blue

            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        }

        return color;
    }    

    getPastelColor(){ 
        return "hsl(" + 360 * this.rand() + ',' +
                   (25 + 70 * this.rand()) + '%,' + 
                   (85 + 10 * this.rand()) + '%)'
    }
}

function xmur3(str) {
        for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
          h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
          h = h << 13 | h >>> 19;
        return function() {
          h = Math.imul(h ^ h >>> 16, 2246822507);
          h = Math.imul(h ^ h >>> 13, 3266489909);
          return (h ^= h >>> 16) >>> 0;
        }
    }  

function Fish(props) {
    let svg =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var seed_num = props.seed;
    var seed_func = xmur3(seed_num.toString());

    svg = createEmptySVG(svg, props.size, props.size, props.direction || "right");

    let fish = new GroovyFish(seed_func, seed_num);
    fish.draw(svg, props.size, props.frame || "rectangle");

    function createEmptySVG(elem, width, height, direction) {
        // let elem = document.getElementById(id);

        elem.setAttribute("xmlns:dc", "http://purl.org/dc/elements/1.1/");
        elem.setAttribute("xmlns:rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
        elem.setAttribute("xmlns:svg", "http://www.w3.org/2000/svg");
        elem.setAttribute("version", "1,1");
        elem.setAttribute("width", width);
        elem.setAttribute("height", height);
        elem.setAttribute("viewBox", "0 0 " + width + " " + height);

        if (direction == "left") {
            elem.setAttribute("style","transform: scale(-1,1)");
        }

        return elem;
     }

     function createMarkup() {
          return {__html: svg.outerHTML};
        }



   
    return ( 
   
        <div dangerouslySetInnerHTML={createMarkup()} />

    )
}

export default memo(Fish);