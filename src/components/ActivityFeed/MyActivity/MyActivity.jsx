import React from "react";
import { DateTimeFormatter, DateFormatter } from '../../../utils/DateTimeFormatter/DateTimeFormatter';
import ActivityUpdateButton from "../ActivityCardContent/ActivityUpdateButton/ActivityUpdateButton";

import { ListItem, ListItemText } from "@mui/material";
import ShareInfoButton from "./ShareInfoButton/ShareInfoButton";


function MyActivity({activity, index}) {
    return activity.claimed_on || activity.fulfilled_on ?
        (
            <ListItem
                key={index}
                secondaryAction={<ShareInfoButton activity={activity} />}
                sx={{ bgcolor: 'warning.light', borderWidth: 2, borderStyle: 'solid', borderColor: 'error.light' }}
            >
                <ListItemText
                    primary={`You shared ${activity.item_name} 
                            with ${activity.claimed_by_user ? activity.claimed_by_user_name : activity.fulfilled_by_user_name} 
                            on ${activity.claimed_on ? DateFormatter(activity.claimed_on) : DateFormatter(activity.fulfilled_on)}`} />
            </ListItem>
        )
        :
        (
            <ListItem
                key={index}
                secondaryAction={<ActivityUpdateButton activity={activity} />}
            >
                <ListItemText
                    primary={`You ${activity.offered_on ? 'offered' : 'requested'} ${activity.item_name} 
                                                        on ${DateFormatter(activity.offered_on) || DateFormatter(activity.requested_on)}`}
                    secondary={`Offer is set to expire on ${DateTimeFormatter(activity.expires_on)}`} />
            </ListItem>
        );
}

export default MyActivity