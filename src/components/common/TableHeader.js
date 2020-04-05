import React, { Component } from 'react';

class TableHeader extends Component {
    render(){
        let tableHeadValues = [];
        let index = 0;
        if(this.props.headerValues.length > 0){
            this.props.headerValues.map((header) => {
                tableHeadValues.push(<th key={index}>{header}</th>);
                index++;
            })
        }
        let actionButtonHeader =[];
        if(this.props.isActionButtonEnabled){
            actionButtonHeader.push(<th key="Edit"></th>);
            actionButtonHeader.push(<th key="Delete"></th>);
        }
        else
        actionButtonHeader = "";

        return(
            <thead>
                <tr>
                    {tableHeadValues}
                    {actionButtonHeader}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;