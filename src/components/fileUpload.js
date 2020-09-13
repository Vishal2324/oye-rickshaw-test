import React from "react";

const FileUpload = (props, ref) => {
    return (
        <input 
            name="file-upload"
            type="file"
            ref={ref}
            onChange={props.onChange}
        />
    )
}

const forwardedFileUpload = React.forwardRef(FileUpload);

export default forwardedFileUpload;