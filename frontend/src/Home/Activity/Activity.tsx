import React from 'react';
import './Activity.css';
export const Activity = () => {
    return (
        <div className="activity">
            <div className="activity_title">Activity</div>
            <div className="activity_body">
                <div className="activity_item">
                    <div className="activity_item_title">Whole Foods</div>
                    <div>$38.93</div>
                    <div>4/5/20</div>
                </div>
                <div className="activity_item">
                    <div className="activity_item_title">Trader Joes</div>
                    <div>$38.93</div>
                    <div>4/5/20</div>
                </div>
                <div className="activity_item">
                    <div className="activity_item_title">Kaiser</div>
                    <div>$38.93</div>
                    <div>4/5/20</div>
                </div>
            </div>
        </div>
    );
};
