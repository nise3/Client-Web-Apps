import React from 'react';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {styled} from '@mui/material/styles';
import {Box, Button, Card, Container, Grid, Tooltip, Typography} from '@mui/material';
import {Link} from '../../../@softbd/elements/common';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import {useIntl} from 'react-intl';
import {ArrowBack, ArrowRightAlt} from '@mui/icons-material';
import {gotoLoginSignUpPage, industryDomain} from "../../../@softbd/common/constants";
import {LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT, LINK_YOUTH_SIGNUP} from "../../../@softbd/common/appLinks";

const PREFIX = 'JobCircularDetails';

const classes = {
    date: `${PREFIX}-date`,
    icon: `${PREFIX}-icon`,
    container: `${PREFIX}-container`,
    image: `${PREFIX}-image`,
    courseItem: `${PREFIX}-courseItem`,
    taka: `${PREFIX}-taka`,
    title: `${PREFIX}-title`,
    company: `${PREFIX}-company`,
    subTitle: `${PREFIX}-subTitle`,
    value: `${PREFIX}-value`,
    sideBox: `${PREFIX}-sideBox`,
    divDesign: `${PREFIX}-divDesign`,
};

const StyledContainer = styled(Container)(({theme}) => ({
    [`& .${classes.date}`]: {
        display: 'flex',
        alignItems: 'center',
    },

    [`& .${classes.icon}`]: {
        color: '#ffff',
        padding: '2px',
        borderRadius: '3px',
        '&:not(:last-child)': {marginRight: '10px'},
    },

    [`& .${classes.container}`]: {
        marginTop: '50px',
    },

    [`& .${classes.image}`]: {
        width: '100%',
        height: '90px',
    },

    [`& .${classes.courseItem}`]: {
        position: 'relative',
        boxShadow: '2px 8px 7px #ddd',
        border: '1px solid #ddd',
    },

    [`& .${classes.taka}`]: {
        margin: '0 10px 0 5px',
    },

    [`& .${classes.title}`]: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },

    [`& .${classes.company}`]: {
        color: theme.palette.grey['600'],
        marginTop: '-11px',
        fontWeight: 'bold'
    },

    [`& .${classes.subTitle}`]: {
        fontWeight: 'bold'
    },

    [`& .${classes.value}`]: {
        marginTop: '-10px'
    },

    [`& .${classes.divDesign}`]: {
        width: 'auto',
        maxWidth: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'inline-block',
    },

    [`& .${classes.sideBox}`]: {
        [theme.breakpoints.up('xs')]: {
            marginTop: '30px',
        },
    },

}));

const JobCircularDetails = () => {
    const {messages} = useIntl();
    const authUser = useAuthUser<YouthAuthUser>();
    const router = useRouter();
    let {jobCircularId} = router.query;

    /*  const {data: jobCircularDetails} = useFetchCourseDetails(
      Number(jobCircularId),
    );*/

    const jobCircularDetails = {
        id: 5,
        company: 'Soft BD Ltd',
        logo: '/images/skill-matching-job-5.png',
        title: 'কম্পিউটার অপারেটর',
        experience: '২-৩ বছর অভিজ্ঞতা',
        location: 'মিরপুর',
        salary: '৫০০০০-৬০০০০',
        description: 'জব এর বিস্তারিত থাকবে এখানে',
        vacancy: '৫',
        job_responsibility: 'যানবাহন বেবস্থাপনায় সহায়তা করা, এডমিন সংক্রান্ত সব তথ্য প্রস্তুত করা ',
        job_type: 'ফুল টাইম',
        educational_requirement: 'BSc',
        job_requirements: 'বয়স ২২ থেকে ২৫ বছর, সক্রিয় ও পরিশ্রমী, উভয় ছেলে মেয়ে আবেদন করতে পারবে, সক্রিয় ও পরিশ্রমী',
        working_place: 'বাংলাদেশের যেকোনো স্থানে',
        facilities: 'আপনি যেমন চাইবেন',
        gender: 'ছেলে ও মেয়ে উভয়',
        release_date: '১০/১২/২১',
        application_deadline: '৩০/১২/২১',
        required_age: '২৫ বছর'
    };

    return (
        <StyledContainer maxWidth={'lg'}>
            <Grid container spacing={3}>
                <Grid item xs={12} mt={5}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box className={classes.date}>
                                <Link href={'/job-circular'}>
                                    <Button
                                        variant={'outlined'}
                                        color={'primary'}
                                        startIcon={<ArrowBack/>}>
                                        {messages['industry.job_circular']}
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container mt={5}>
                        <Grid item xs={12} md={8}>
                            <Typography
                                variant='subtitle1'
                                gutterBottom={true}
                                className={classes.title}>
                                {jobCircularDetails.title}
                            </Typography>
                            <Typography
                                variant='subtitle2'
                                gutterBottom={true}
                                className={classes.company}>
                                {jobCircularDetails.company}
                            </Typography>
                        </Grid>

                        {/** share buttons */}
                        <Grid item xs={12} md={4}>
                            <Grid item xs={12}>
                                <Tooltip title={messages['common.like']}>
                                    <ThumbUpAltIcon
                                        className={classes.icon}
                                        sx={{backgroundColor: '#008fff'}}
                                    />
                                </Tooltip>
                                <Tooltip title={messages['common.share_label']}>
                                    <ShareIcon
                                        className={classes.icon}
                                        sx={{backgroundColor: '#4E4E98'}}
                                    />
                                </Tooltip>
                                <Tooltip title={messages['common.print']}>
                                    <PrintOutlinedIcon
                                        className={classes.icon}
                                        sx={{backgroundColor: '#ffb700b8'}}
                                    />
                                </Tooltip>
                                <Tooltip title={messages['common.download_label']}>
                                    <SystemUpdateAltOutlinedIcon
                                        className={classes.icon}
                                        sx={{backgroundColor: '#2fc94d'}}
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/** main  content */}
                    <Grid container>
                        {/** main  content: left texts */}
                        <Grid item xs={12} md={8}>
                            <div className={classes.divDesign}>
                                <Typography gutterBottom={true} className={classes.subTitle}
                                            style={{marginTop: '30px'}}>
                                    {messages['industry.vacancy']}
                                </Typography>
                                <Typography
                                    gutterBottom={true}
                                    className={classes.value}>
                                    {jobCircularDetails.vacancy}
                                </Typography>
                            </div>
                            <br/>
                            <div className={classes.divDesign}>
                                <Typography gutterBottom={true} className={classes.subTitle}
                                            style={{marginTop: '30px'}}>
                                    {messages['industry.job_responsibility']}
                                </Typography>
                                <Typography
                                    gutterBottom={true}
                                    className={classes.value}>
                                    {jobCircularDetails.job_responsibility}
                                </Typography>
                            </div>
                            <br/>

                            <div className={classes.divDesign}>
                                <Typography gutterBottom={true} className={classes.subTitle}
                                            style={{marginTop: '30px'}}>
                                    {messages['industry.job_type']}
                                </Typography>
                                <Typography
                                    gutterBottom={true}
                                    className={classes.value}>
                                    {jobCircularDetails.job_type}
                                </Typography>
                            </div>
                            <br/>

                            <div className={classes.divDesign}>
                                <Typography gutterBottom={true} className={classes.subTitle}
                                            style={{marginTop: '30px'}}>
                                    {messages['industry.educational_requirement']}
                                </Typography>
                                <Typography
                                    gutterBottom={true}
                                    className={classes.value}>
                                    {jobCircularDetails.educational_requirement}
                                </Typography>
                            </div>
                            <br/>

                            <div className={classes.divDesign}>
                                <Typography gutterBottom={true} className={classes.subTitle}
                                            style={{marginTop: '30px'}}>
                                    {messages['industry.job_requirements']}
                                </Typography>
                                <Typography
                                    gutterBottom={true}
                                    className={classes.value}>
                                    {jobCircularDetails.job_requirements}
                                </Typography>
                            </div>
                            <br/>

                            <div className={classes.divDesign}>
                                <Typography gutterBottom={true} className={classes.subTitle}
                                            style={{marginTop: '30px'}}>
                                    {messages['industry.working_place']}
                                </Typography>
                                <Typography
                                    gutterBottom={true}
                                    className={classes.value}>
                                    {jobCircularDetails.working_place}
                                </Typography>
                            </div>
                            <br/>

                            <div className={classes.divDesign}>
                                <Typography gutterBottom={true} className={classes.subTitle}
                                            style={{marginTop: '30px'}}>
                                    {messages['industry.facilities']}
                                </Typography>
                                <Typography
                                    gutterBottom={true}
                                    className={classes.value}>
                                    {jobCircularDetails.facilities}
                                </Typography>
                            </div>
                            <br/>

                            <Typography gutterBottom={true} className={classes.subTitle}
                                        style={{marginTop: '30px'}}>
                                {messages['industry.salary']}
                            </Typography>
                            <Typography
                                gutterBottom={true}
                                className={classes.value}>
                                <Box
                                    component={'span'}
                                    fontWeight='fontWeightBold'
                                    className={classes.taka}>
                                    &#2547;
                                </Box>{jobCircularDetails.salary} {messages['common.taka']}
                            </Typography>

                        </Grid>

                        {/** main  content: right side box */}
                        <Grid item xs={12} md={4} className={classes.sideBox}>
                            <Box mr={1} ml={1}>
                                <Card className={classes.courseItem}>
                                    <Box>
                                        <img
                                            className={classes.image}
                                            src={jobCircularDetails.logo}
                                            alt={jobCircularDetails.title}
                                            title={jobCircularDetails.title}
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <Typography gutterBottom={true}>
                                            <span
                                                style={{fontWeight: 'bold'}}>{messages['industry.release_date']}</span>
                                            <ArrowRightAlt
                                                sx={{marginBottom: '-6px'}}/> {jobCircularDetails.release_date}
                                        </Typography>

                                        <Typography gutterBottom={true}>
                                            <span style={{fontWeight: 'bold'}}>{messages['industry.vacancy']}</span>
                                            <ArrowRightAlt sx={{marginBottom: '-6px'}}/>{jobCircularDetails.vacancy}
                                        </Typography>

                                        <Typography gutterBottom={true}>
                                            <span style={{fontWeight: 'bold'}}>{messages['industry.job_type']}</span>
                                            <ArrowRightAlt sx={{marginBottom: '-6px'}}/>{jobCircularDetails.job_type}
                                        </Typography>

                                        <Typography gutterBottom={true}>
                                            <span
                                                style={{fontWeight: 'bold'}}>{messages['industry.required_age']}</span>
                                            <ArrowRightAlt
                                                sx={{marginBottom: '-6px'}}/>{jobCircularDetails.required_age}
                                        </Typography>

                                        <Typography gutterBottom={true}>
                                            <span style={{fontWeight: 'bold'}}>{messages['industry.gender']}</span>
                                            <ArrowRightAlt sx={{marginBottom: '-6px'}}/>{jobCircularDetails.gender}
                                        </Typography>

                                        <Typography gutterBottom={true}>
                                            <span style={{fontWeight: 'bold'}}>{messages['industry.salary']} </span>
                                            <ArrowRightAlt
                                                sx={{marginBottom: '-6px'}}/>
                                            <Box
                                                component={'span'}
                                                fontWeight='fontWeightBold'
                                                className={classes.taka}>
                                                &#2547;
                                            </Box>{jobCircularDetails.salary} {messages['common.taka']}
                                        </Typography>

                                        <Typography gutterBottom={true}>
                                            <span
                                                style={{fontWeight: 'bold'}}>{messages['industry.application_deadline']} </span>
                                            <ArrowRightAlt
                                                sx={{marginBottom: '-6px'}}/>{jobCircularDetails.application_deadline}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <Box style={{textAlign: 'center', margin: '30px 0'}}>
                <Link
                    href={
                        authUser
                            ? industryDomain() +
                            LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT +
                            jobCircularId
                            : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                    }>
                    <Button variant={'contained'} color={'primary'}>
                        {messages['industry.apply_now']}
                    </Button>
                </Link>
            </Box>
        </StyledContainer>
    );
};

export default JobCircularDetails;
