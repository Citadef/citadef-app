import { useHistory } from "react-router-dom";

class GhostFace {
    constructor(seed_func, seed_num) {
        this.seed = seed_func;
        this.clip_path_name = "ghost_" + seed_num + "_clip";
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

    draw(svg, size) {
        let r = size/4;
        let points_num = Math.round(8+this.rand()*4);

        let origin_x = size/2;
        let origin_y = size/2;
        let points = this.randomPointsNearCircle(points_num, origin_x, origin_y, r/2, r);

        // ghost colors
        let face_color = this.getBrightColor();

        svg = this.addMultyBezier(points, face_color, svg, this.clip_path_name);

        // // eye and eye ball
        svg = this.circle(points[0].x-r/4, points[0].y, size/12, svg, "black", this.clip_path_name);
        // svg = this.circle(points[0].x, points[0].y, 2, svg, "white", this.clip_path_name);

        // // left eye
        // this.circle(origin_x - r/4, origin_y - r/3, 4, svg, "white", this.clip_path_name);
        this.circle(origin_x - r/4, origin_y - r/3, size/11, svg, "black", this.clip_path_name);

        // // right eye
        // this.circle(origin_x + r/4, origin_y - r/3, 20, svg, "white", this.clip_path_name);
        // this.circle(origin_x + r/4, origin_y - r/3, 3, svg, "black", this.clip_path_name);

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

 
    addMultyBezier(points, color, svg, clip_path_name) {
        var bezier = document.createElementNS("http://www.w3.org/2000/svg", "path");    

        let m1 = points[0].x;
        let m2 = points[0].y;

        let d = "M " + m1 + " " + m2 + " ";
        d = d + "Q " + points[0].x + " " + points[0].y + " " + points[1].x + " " + points[1].y + " ";

        for (let i=2; i<points.length; i++) {
          d = d + "T " + points[i].x + " " + points[i].y + " ";
        }
        d = d + "T" + points[0].x + "," + points[0].y;
        
        let l = points.length
        points[l] = new Object();
        points[l].x = points[0].x;
        points[l].y = points[0].y;

        let p = this.spline(points)

        bezier.setAttribute('d', p);
                bezier.setAttribute('stroke', 'black');
        bezier.setAttribute('fill', 'transparent');
        bezier.setAttribute('fill', color);

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

  spline(points = [], tension = 1, close = false, cb) {
      points = this.formatPoints(points, close);

      const size = points.length;
      const last = size - 4;

      const startPointX = close ? points[2] : points[0];
      const startPointY = close ? points[3] : points[1];

      let path = "M" + [startPointX, startPointY];

      cb && cb("MOVE", [startPointX, startPointY]);

      const startIteration = close ? 2 : 0;
      const maxIteration = close ? size - 4 : size - 2;
      const inc = 2;

      for (let i = startIteration; i < maxIteration; i += inc) {
        const x0 = i ? points[i - 2] : points[0];
        const y0 = i ? points[i - 1] : points[1];

        const x1 = points[i + 0];
        const y1 = points[i + 1];

        const x2 = points[i + 2];
        const y2 = points[i + 3];

        const x3 = i !== last ? points[i + 4] : x2;
        const y3 = i !== last ? points[i + 5] : y2;

        const cp1x = x1 + ((x2 - x0) / 6) * tension;
        const cp1y = y1 + ((y2 - y0) / 6) * tension;

        const cp2x = x2 - ((x3 - x1) / 6) * tension;
        const cp2y = y2 - ((y3 - y1) / 6) * tension;

        path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];

        cb && cb("CURVE", [cp1x, cp1y, cp2x, cp2y, x2, y2]);
      }

      return path;
    }

    formatPoints(points, close) {
        points = [...points];
        // so that coords can be passed as objects or arrays
        if (!Array.isArray(points[0])) {
          points = points.map(({ x, y }) => [x, y]);
        }

        if (close) {
          const lastPoint = points[points.length - 1];
          const secondToLastPoint = points[points.length - 2];

          const firstPoint = points[0];
          const secondPoint = points[1];

          points.unshift(lastPoint);
          points.unshift(secondToLastPoint);

          points.push(firstPoint);
          points.push(secondPoint);
        }

        return points.flat();
      }

    randomPointsNearCircle(points_num, origin_x, origin_y, noise, r) {
        let points = new Array(points_num);

        for (let i=0; i<points_num; i++) {
          let point = (i*2*Math.PI)/points_num;
          let r_with_noise = r + this.rand()*noise;
          let x = r_with_noise*Math.cos(point) + origin_x;
          let y = r_with_noise*Math.sin(point) + origin_y;

          points[i] = new Object();
          points[i].x = x;
          points[i].y = y;
        }

        return points;

    }


    // Colors functions
    //================================================== 
    getColor(){ 
        return '#' + Math.floor(this.rand()*16777215).toString(16);
    }
    getBrightColor(){ 
        let color =  '#' + Math.floor(this.rand()*16777215).toString(16);

        let stripped_color = color.substring(1);      // strip #
        let rgb = parseInt(stripped_color, 16);   // convert rrggbb to decimal
        let r = (rgb >> 16) & 0xff;  // extract red
        let g = (rgb >>  8) & 0xff;  // extract green
        let b = (rgb >>  0) & 0xff;  // extract blue

        let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        while (luma < 110) {
            color =  '#' + Math.floor(this.rand()*16777215).toString(16);

            stripped_color = color.substring(1);      // strip #
            
            rgb = parseInt(stripped_color, 16);   // convert rrggbb to decimal
            r = (rgb >> 16) & 0xff;  // extract red
            g = (rgb >>  8) & 0xff;  // extract green
            b = (rgb >>  0) & 0xff;  // extract blue

            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        }

        return color;
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

function Ghost(props) {
    let svg =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var seed_num = props.seed;
    var seed_func = xmur3(seed_num.toString());

    svg = createEmptySVG(svg, props.size, props.size);

    let ghost = new GhostFace(seed_func, seed_num);
    ghost.draw(svg, props.size);

    function createEmptySVG(elem, width, height) {
        // let elem = document.getElementById(id);

        elem.setAttribute("xmlns:dc", "http://purl.org/dc/elements/1.1/");
        elem.setAttribute("xmlns:rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
        elem.setAttribute("xmlns:svg", "http://www.w3.org/2000/svg");
        elem.setAttribute("version", "1,1");
        elem.setAttribute("width", width);
        elem.setAttribute("height", height);
        elem.setAttribute("style","background-color:white; -webkit-border-radius: 100% !important;");
        elem.setAttribute("viewBox", "0 0 " + width + " " + height);

        return elem;
     }

     function createMarkup() {
          return {__html: svg.outerHTML};
        }


   
    return ( 
   
        <div dangerouslySetInnerHTML={createMarkup()} />

    )
}

export default Ghost;