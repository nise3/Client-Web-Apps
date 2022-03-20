
import * as d3 from "d3";
import moment from "moment";
import LocaleLanguage from "../utilities/LocaleLanguage";

interface IcvPosition {
    rectDefaultWidth: number;
    rectDefaultHeight: number;
    startPositionX: number;
    startPositionY: number;
    headerHeight: number;
    lineHeight: number;
    locale: string;
}

interface ITextDesign {
    headlineSize: number;
    bodyFontSize: number;
}

interface IRenderSVG extends IcvPosition, ITextDesign {
}

const LanguageProficiencyType: any = {
    '1': 'Easily',
    '2': 'Not Easily',
  };

  export const getProps = (propsName: string, locale: string): string => {
    const props = (locale === LocaleLanguage.BN) ? propsName : propsName + '_en';
    return props;
  }

const getCVData = (data: any, messages, options: IcvPosition) => {

    const textPadding: number = 10;
    const bottomPadding: number = 15;

    const rect = {
        width: options.rectDefaultWidth,
        height: options.rectDefaultHeight,
        x: options.startPositionX,
        y: options.startPositionY
    }

    const d3Value = [
        {
            id: 'Objective',
            headline: 'Objective',
            body: data[getProps('bio', options.locale)],
            position: { x: rect.x, y: rect.y }
        },
        {
            id: 'JobExperiance',
            headline: 'Job Experience',
            body: data.youth_job_experiences.map((e:any, i) => {
                let duration = "";
                if (e.is_currently_working) {
                    duration += messages['common.present']// `Currently working here`;
                } else {
                    duration += `Start Date: ${moment(e.start_date).format('DD-MM-YYYY')}, End Date: ${moment(e.end_date).format('DD-MM-YYYY')}`;
                }
                return `${i+1}. 
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
            body: data.youth_educations.map((e, i) => {
                let resultTxt = "Result: ";
                if (e.cgpa) {
                    resultTxt += ` ${e.cgpa}`;
                } else {
                    resultTxt += ` ${e.result.title}`;
                }
                return `${i+1}. 
                Institute Name: ${e.institute_name_en}, 
                Duration (Years):${e.duration}, 
                Result: ${e.cgpa},
                Year of passing: ${e.year_of_passing}
                `
            }),
            position: { x: rect.x, y: rect.y }
        },
        {
            id: 'Skills',
            headline: 'Skills',
            body: data.skills.map((e:any, i: number) => {
                return `${i+1}. ${e.title}`
            }),
            position: { x: rect.x, y: rect.y }
        },
        {
            id: 'languages_proficiencies',
            headline: 'Language Proficiency',
            body: data.youth_languages_proficiencies.map((e:any) => {
                return `Language: ${e.language_title}
                ${e.reading_proficiency_level ? LanguageProficiencyType[e.reading_proficiency_level] : ''}
                `
            }),
            position: { x: rect.x, y: rect.y }
        }
    ]

    const objective = d3Value.filter(item => item.id == 'Objective')[0];
    const experiance = d3Value.filter(item => item.id == 'JobExperiance')[0];
    const education = d3Value.filter(item => item.id == 'Education')[0];
    const skills = d3Value.filter(item => item.id == 'Skills')[0];
    const languages_proficiencies = d3Value.filter(item => item.id == 'languages_proficiencies')[0];

    experiance.position.y += options.rectDefaultHeight;
    education.position.y = experiance.position.y + options.rectDefaultHeight;
    
    skills.position.y = education.position.y + options.rectDefaultHeight;
    const heightPerLine = options.rectDefaultHeight / options.headerHeight; // 5.5

    let skillsHeight = options.rectDefaultHeight;
    if (skills.body && skills.body.length > heightPerLine) {
        skillsHeight = (skills.body.length * options.lineHeight) + textPadding + bottomPadding ;
        skills['height'] = skillsHeight;
    }

    if (skillsHeight !== options.rectDefaultHeight) {
        languages_proficiencies.position.y = skills.position.y + skillsHeight;
    } else {
        languages_proficiencies.position.y = skills.position.y + options.rectDefaultHeight;
    }

    let languageHeight = options.rectDefaultHeight;
    if (languages_proficiencies.body && languages_proficiencies.body.length > heightPerLine) {
        languageHeight = (languages_proficiencies.body.length * options.lineHeight) + textPadding + bottomPadding ;
        languages_proficiencies['height'] = languageHeight;
    }
    
    return d3Value;
}

const renderSVG = (data: any, options: IRenderSVG) => {
    
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
        .attr('height', (d:any)=> {
            return d.height || options.rectDefaultHeight
        })
        .attr('fill', 'transparent')
        // .attr('fill', '#ccc')

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
        .attr('font-size', options.headlineSize)
    const lineBottomSpace = 5;
    allSections.append("line")
        .attr("x1", (e: any) => {
            console.log('line pos', e)
            return e.position.x
        }).attr("y1", (e: any) => {
            return e.position.y + lineBottomSpace
        })
        .attr("x2", (e: any) => {
            return options.rectDefaultWidth
        }).attr("y2", (e: any) => {
            return e.position.y + lineBottomSpace
        }).attr("style", "stroke:#bcbec0;stroke-width:1")


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
        .call(setArrayText, options.rectDefaultWidth, options.lineHeight)
}

export const getStructureData = (data, messages, locale) => {

    const startPositionX: number = 18;
    const startPositionY: number = 185;
    const rectDefaultWidth: number = 560;
    const rectDefaultHeight: number = 100;
    const headerHeight: number = 20;
    const bodyFontSize: number = 11;
    const headlineSize: number = bodyFontSize + 3;
    const lineHeight = 18;

    // const data = {
    //     // bio: null,
    //     bio: "বাংলায় ক্যারিয়ার অব্জেক্টিভ",
    //     bio_en: "A resourceful individual with a proven track record in implementing successful marketing strategies,boosting organic traffic, and improving search rankings seeks a position of Marketing Associate at ABCcompany to maximize brand awareness and revenue through integrated marketing communications. A resourceful individual with a proven track record in implementing successful marketing strategies,boosting organic traffic, and improving search rankings seeks a position of Marketing Associate at ABCcompany to maximize brand awareness and revenue through integrated marketing communications.",
    //     youth_educations: [
    //         {
    //             institute_name: "ঢাকা স্কুল এন্ড কলেজ",
    //             institute_name_en: "Dhaka school and collage",
    //             cgpa: null,
    //             cgpa_scale: null,
    //             duration: 2,
    //             result: {
    //                 code: "FIRST_DIVISION",
    //                 id: 1,
    //                 title: "First Division/Class",
    //                 title_en: "First Division/Class"
    //             },
    //             year_of_passing: "2013"
    //         },
    //         {
    //             institute_name: "বিশ্ব জাকের মঞ্জিল সরকারী উচ্চ বিদ্যালয়",
    //             institute_name_en: "Bisewa jaker manjil govt. heigh school",
    //             cgpa: 3.5,
    //             cgpa_scale: 4,
    //             duration: 2,
    //             result: {
    //                 code: "GRADE",
    //                 id: 4,
    //                 title: "Grade",
    //                 title_en: "Grade"
    //             },
    //             year_of_passing: "2021"
    //         }
    //     ],
    //     youth_job_experiences: [
    //         {
    //             company_name: "সফটবিডি",
    //             company_name_en: "SoftBD",
    //             position: "সফটওয়্যার ইঞ্জিনিয়ার",
    //             position_en: "Software Engineer",
    //             is_currently_working: 1,
    //             end_date: "2022-02-16T18:00:00.000000Z",
    //             start_date: "2020-12-31T18:00:00.000000Z"
    //         },
    //         {
    //             company_name: "NewCred",
    //             company_name_en: null,
    //             position: "Software Engr.",
    //             position_en: null,
    //             is_currently_working: 0,
    //             end_date: "2022-01-31T18:00:00.000000Z",
    //             start_date: "2021-12-31T18:00:00.000000Z"
    //         }
    //     ],
    //     skills: [
    //         {
    //             title: "সাংগঠনিক সংস্কৃতি",
    //             title_en: "Organizational Culture"
    //         }
    //         , {
    //             title: "ব্যবসায়িক লেখা",
    //             title_en: "Business Writing"
    //         }, {
    //             title: "কুকিং",
    //             title_en: "Cooking"
    //         }, 
    //         {
    //             title: "টেক্সটাইল প্রযুক্তি",
    //             title_en: "Textile Technology"
    //         },
    //         {
    //             title: "সাংগঠনিক সংস্কৃতি",
    //             title_en: "Organizational Culture"
    //         }
    //         , {
    //             title: "ব্যবসায়িক লেখা",
    //             title_en: "Business Writing"
    //         }, {
    //             title: "কুকিং",
    //             title_en: "Cooking"
    //         }, {
    //             title: "টেক্সটাইল প্রযুক্তি",
    //             title_en: "Textile Technology"
    //         }, {
    //             title: "কুকিং",
    //             title_en: "Cooking"
    //         }, {
    //             title: "টেক্সটাইল প্রযুক্তি",
    //             title_en: "Textile Technology"
    //         }
    //     ],
    //     youth_languages_proficiencies: [
    //         {
    //             language_title: "বাংলা",
    //             language_title_en: "Bengali"
    //         },
    //         {
    //             language_title: "বাংলা",
    //             language_title_en: "Bengali"
    //         },
    //         {
    //             language_title: "বাংলা",
    //             language_title_en: "Bengali"
    //         },
    //         {
    //             language_title: "বাংলা",
    //             language_title_en: "Bengali"
    //         },
    //         {
    //             language_title: "বাংলা",
    //             language_title_en: "Bengali"
    //         },
    //         {
    //             language_title: "বাংলা",
    //             language_title_en: "Bengali"
    //         }
    //     ]
    // }


    const cvDataOptions = {
        headerHeight: headerHeight,
        rectDefaultHeight: rectDefaultHeight,
        rectDefaultWidth: rectDefaultWidth,
        startPositionX: startPositionX,
        startPositionY: startPositionY,
        lineHeight: lineHeight,
        locale: locale
    }

    const d3Value = getCVData(data, messages, cvDataOptions);

    renderSVG(d3Value, {
        ...cvDataOptions, ...{
            bodyFontSize: bodyFontSize,
            headlineSize: headlineSize
        }
    })

}

function setArrayText(txtElem, width, lineHeight) {
    
    txtElem.each(function (e) {
        let txtElem = d3.select(this);
        for (let i = 0; i < e.body.length; i++) {
            const element =  `${e.body[i]}`;
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