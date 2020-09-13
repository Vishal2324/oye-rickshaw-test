import React from "react";

const Table = props => {
    let tableHeaders = props.data[0].data.split(",");
    tableHeaders = ["", ...tableHeaders, "action", "remark"];
    return (
        <table>
            <tbody>
                <tr>
                    {tableHeaders.map((header, headerIdx) => 
                        <th key={header+headerIdx}>{header.toUpperCase()}</th>
                    )}
                </tr>
                {props.data.map((row, idx) => { 
                    if(idx === 0){
                        return null;
                    }
                    const rowData = row.data.split(",");
                    const rowSelected = row.selected === true;
                    if(rowData.length <= 1){
                        return null;
                    }
                    return (
                        <tr key={idx}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={rowSelected}
                                    onChange={props.handleSelectionChange.bind(this, idx)}
                                />
                            </td>
                            {rowData.map((cell, cell_id) => {
                                return <td key={cell_id}>{cell}</td>
                            })}
                            <td>
                                {row.approved && "APPROVED"}
                                {row.rejected && "REJECTED"}
                                {(!row.approved && !row.rejected) && <div>
                                    <button onClick={props.handleApprove.bind(this, idx)}>Approve</button>
                                    <button onClick={props.handleReject.bind(this, idx, true)}>Reject</button>
                                </div>}
                            </td>
                            <td>{row.remark}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;