
import * as d3 from "d3";

export const getStructureData = () => {

    const data = {
        bio: "বাংলায় ক্যারিয়ার অব্জেক্টিভ",
        bio_en: "A resourceful individual with a proven track record in implementing successful marketing strategies,boosting organic traffic, and improving search rankings seeks a position of Marketing Associate at ABCcompany to maximize brand awareness and revenue through integrated marketing communications.",
        youth_educations: [
            {
                institute_name: "ঢাকা স্কুল এন্ড কলেজ",
                institute_name_en: "Dhaka school and collage",
                cgpa: "3.5"
            },
            {
                institute_name: "ABC",
                institute_name_en: "abc",
                cgpa: "4"
            }
        ]
    }


    const startPositionX: number = 18;
    const startPositionY: number = 185;
    const rectDefaultWidth: number = 560;
    const rectDefaultHeight: number = 100;
    const headerHeight: number = 20;
    const bodyFontSize: number = 12;

    const rect = {
        width: rectDefaultWidth,
        height: rectDefaultHeight,
        x: startPositionX,
        y: startPositionY
    }

    const d3Value = [
        {
            headline: 'Objective',
            body: data.bio,
            position: { x: rect.x, y: rect.y }
        },
        {
            headline: 'Experiance',
            body: data.bio_en,
            position: { x: rect.x, y: rect.y }
        },
        {
            headline: 'Education',
            body: data.youth_educations,
            position: { x: rect.x, y: rect.y }
        }
    ]

    const objective = d3Value.filter(item => item.headline == 'Objective');
    const experiance = d3Value.filter(item => item.headline == 'Experiance')[0];
    // if (objective.length > 0) {
    d3Value.filter(item => item.headline == 'Experiance')[0].position.y += rectDefaultHeight;
    d3Value.filter(item => item.headline == 'Education')[0].position.y = experiance.position.y + rectDefaultHeight;
    // }



    // const strValue = {
    //   objective: {
    //     headline: {
    //       position: {x: rect.x, y: rect.y},
    //       text: "Objective"
    //     },
    //     body: {
    //       position: {x: rect.x, y: rect.y + headerHeight},
    //       text: data.bio
    //     }
    //   }
    // }


    const dthree = d3.select('g[id="cv-body"]');
    const allSections = dthree
        .selectAll('g')
        .data(d3Value)
        .enter()

    // rectangle
    allSections.append('rect')
        .attr('x', startPositionX)
        .attr('y', (e: any) => {
            return e.position.y
        })
        .attr('width', rectDefaultWidth)
        .attr('height', rectDefaultHeight)
        // .attr('fill', 'transparent')
        .attr('fill', '#ccc')

    // headline
    allSections.append("g")
        .append("text")
        .attr("y", (e: any) => {
            return e.position.y
        })
        .attr("x", (e: any) => {
            return e.position.x
        })
        .text((txt: any) => {
            return txt.headline;
        })

    // body
    allSections
        .append('text')
        .attr("y", (e: any) => {
            return e.position.y + headerHeight
        })
        .attr("x", (e: any) => {
            return e.position.x
        })
        .text((txt: any) => {
            if (!Array.isArray(txt.body)) {
                return txt.body;
            }
        })
        .attr('font-size', bodyFontSize)
        .attr('fill', '#231f20')
        .call(wrap, rectDefaultWidth)

    allSections
        .filter((d: any) => {
            return Array.isArray(d.body);
        })
        .append('text')
        .attr("y", (e: any) => {
            return e.position.y + headerHeight
        })
        .attr("x", (e: any) => {    
            return e.position.x
        })
        .text((txt: any) => {
            // return txt.body[0].institute_name;
            var text = d3.select(this);
            const body = txt.body.map((item:any)=> {
                return `${item.institute_name}, ${item.cgpa}`
            });
            // console.log(text, body)
            // txt.body.map((item:any)=> {
            //     const innertext = `${item.institute_name}, ${item.cgpa}`;
                text
                .append('ul')
            // });
            // return txt.body.map((item:any)=> {
            //     return `${item.institute_name}, ${item.cgpa}`
            // });
        })
        .attr('font-size', bodyFontSize)
        .attr('fill', '#231f20')

}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    });
}