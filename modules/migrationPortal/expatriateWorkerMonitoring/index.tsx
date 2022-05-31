import {styled} from '@mui/material/styles';
import {Grid} from '@mui/material';
import React from "react";
import WorldMap from "react-svg-worldmap";
import {useIntl} from "react-intl";

const PREFIX = 'ExpatriateWorkerMonitoring';

const classes = {
    test: `${PREFIX}-test`,
};

const StyledGrid = styled(Grid)(({theme}) => {
    return {
        [`& .${classes.test}`]: {
            width: '100%',
        },
    };
});

const ExpatriateWorkerMonitoring = () => {
    const {messages} = useIntl();
    const data = [
        {country: "cn", value: 1389618778}, // china
        {country: "in", value: 1311559204}, // india
        {country: "us", value: 331883986}, // united states
        {country: "id", value: 264935824}, // indonesia
        {country: "pk", value: 210797836}, // pakistan
        {country: "br", value: 210301591}, // brazil
        {country: "ng", value: 208679114}, // nigeria
        {country: "bd", value: 161062905}, // bangladesh
        {country: "ru", value: 141944641}, // russia
        {country: "mx", value: 127318112}, // mexico
    ];
    return (
        <StyledGrid sx={{maxWidth: '100%'}} className={classes.test}>
            <WorldMap
                color="red"
                title={messages['migration_portal.expatriate_worker_monitoring'] as string}
                value-suffix="people"
                data={data}
                size={'xxl'}
                frame={true}
            />
        </StyledGrid>
    );
};

export default ExpatriateWorkerMonitoring;
