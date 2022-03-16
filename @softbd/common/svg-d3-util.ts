
import { Biotech } from "@mui/icons-material";
import * as d3 from "d3";

interface IcvPosition{
    rectDefaultWidth: number;
    rectDefaultHeight: number;
    startPositionX: number;
    startPositionY: number;
    headerHeight: number;
}

interface ITextDesign{
    // headline: number;
    bodyFontSize: number;
}

interface IRenderSVG extends IcvPosition, ITextDesign{
}


const getCVData = (data: any, options: IcvPosition) => {
    

    const rect = {
        width: options.rectDefaultWidth,
        height: options.rectDefaultHeight,
        x: options.startPositionX,
        y: options.startPositionY
    }

    const d3Value = [
        {
            headline: 'Objective',
            body: data.bio,
            position: { x: rect.x, y: rect.y }
        },
        {
            id: 'JobExperiance',
            headline: 'Experiance',
            body: data.youth_job_experiences.map(e => {
                let duration = "";
                if (e.is_currently_working) {
                    duration += `Currently working here`;
                } else {
                    duration += `Start Date: ${e.start_date}, End Date: ${e.end_date}`;
                }
                return `
                    Company Name: ${e.company_name}, 
                    Position:${e.position},
                    ${duration}
                `
            }),
            position: { x: rect.x, y: rect.y }
        },
        {
            id: 'Education',
            headline: 'Education',
            body: data.youth_educations.map(e => {
                let resultTxt = "Result: ";
                if (e.cgpa) {
                    resultTxt += ` ${e.cgpa}`;
                } else {
                    resultTxt += ` ${e.result.title}`;
                }
                return `
                Institute Name: ${e.institute_name_en}, 
                Duration (Years):${e.duration}, 
                Result: ${e.cgpa},
                Year of passing: ${e.year_of_passing}
                `
            }),
            position: { x: rect.x, y: rect.y }
        }
    ]

    const objective = d3Value.filter(item => item.id == 'Objective');
    const experiance = d3Value.filter(item => item.id == 'JobExperiance')[0];
    // if (objective.length > 0) {
    d3Value.filter(item => item.id == 'JobExperiance')[0].position.y += options.rectDefaultHeight;
    d3Value.filter(item => item.id == 'Education')[0].position.y = experiance.position.y + options.rectDefaultHeight;

    return d3Value;
}

const renderSVG = (data: any, options: IRenderSVG) =>{
    const dthree = d3.select('g[id="cv-body"]');
    const allSections = dthree
        .selectAll('g')
        .data(data)
        .enter()

    // rectangle
    allSections.append('rect')
        .attr('x', options.startPositionX)
        .attr('y', (e: any) => {
            return e.position.y
        })
        .attr('width', options.rectDefaultWidth)
        .attr('height', options.rectDefaultHeight)
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
    const textElem = allSections
        .append('text')
        .attr("y", (e: any) => {
            return e.position.y + options.headerHeight
        })
        .attr("x", (e: any) => {
            return e.position.x
        })

    textElem.text((txt: any) => {
        if (!Array.isArray(txt.body)) {
            return txt.body;
        }
    })
        .attr('font-size', options.bodyFontSize)
        .attr('fill', '#231f20')
        .call(wrap, options.rectDefaultWidth)

    allSections
        .filter((d: any) => {
            return Array.isArray(d.body);
        })
        // .enter()
        .append('g')
        .attr("y", (e: any) => {
            return e.position.y + options.headerHeight
        })
        .attr("x", (e: any) => {
            return e.position.x
        })
        // .text(setArrayText)
        .attr('font-size', options.bodyFontSize)
        .attr('fill', '#231f20')
        .call(setArrayText, options.rectDefaultWidth)
}

export const getStructureData = () => {

    const startPositionX: number = 18;
    const startPositionY: number = 185;
    const rectDefaultWidth: number = 560;
    const rectDefaultHeight: number = 100;
    const headerHeight: number = 20;
    const bodyFontSize: number = 12;

    const data = {
        bio: "বাংলায় ক্যারিয়ার অব্জেক্টিভ",
        bio_en: "A resourceful individual with a proven track record in implementing successful marketing strategies,boosting organic traffic, and improving search rankings seeks a position of Marketing Associate at ABCcompany to maximize brand awareness and revenue through integrated marketing communications.",
        youth_educations: [
            {
                institute_name: "ঢাকা স্কুল এন্ড কলেজ",
                institute_name_en: "Dhaka school and collage",
                cgpa: null,
                cgpa_scale: null,
                duration: 2,
                result: {
                    code: "FIRST_DIVISION",
                    id: 1,
                    title: "First Division/Class",
                    title_en: "First Division/Class"
                },
                year_of_passing: "2013"
            },
            {
                institute_name: "বিশ্ব জাকের মঞ্জিল সরকারী উচ্চ বিদ্যালয়",
                institute_name_en: "Bisewa jaker manjil govt. heigh school",
                cgpa: 3.5,
                cgpa_scale: 4,
                duration: 2,
                result: {
                    code: "GRADE",
                    id: 4,
                    title: "Grade",
                    title_en: "Grade"
                },
                year_of_passing: "2021"
            }
        ],
        youth_job_experiences: [
            {
                company_name: "সফটবিডি",
                company_name_en: "SoftBD",
                position: "সফটওয়্যার ইঞ্জিনিয়ার",
                position_en: "Software Engineer",
                is_currently_working: 1,
                end_date: "2022-02-16T18:00:00.000000Z",
                start_date: "2020-12-31T18:00:00.000000Z"
            },
            {
                company_name: "NewCred",
                company_name_en: null,
                position: "Software Engr.",
                position_en: null,
                is_currently_working: 0,
                end_date: "2022-01-31T18:00:00.000000Z",
                start_date: "2021-12-31T18:00:00.000000Z"
            }
        ]
    }


    const cvDataOptions = {
        headerHeight: headerHeight,
        rectDefaultHeight: rectDefaultHeight,
        rectDefaultWidth: rectDefaultWidth,
        startPositionX: startPositionX,
        startPositionY: startPositionY
    }
    
    const d3Value = getCVData(data, cvDataOptions);

    renderSVG(d3Value, {...cvDataOptions, ...{
        bodyFontSize: bodyFontSize
    }})

}

function setArrayText(txtElem, width) {
    const lineHeight = 18;
    txtElem.each(function (e) {
        let txtElem = d3.select(this);
        for (let i = 0; i < e.body.length; i++) {
            const element = `${i + 1}. ${e.body[i]}`;
            txtElem
                .append('text')
                .attr("y", (e: any) => {
                    return e.position.y + (lineHeight * (i + 1))
                })
                .attr("x", (e: any) => {
                    return e.position.x
                })
                .text(element)
                .call(wrap, width)
        }
    })
}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.2, // ems
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