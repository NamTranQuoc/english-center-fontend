import React from "react";

function UpDownButton(props) {
    return (
        <div className="d-flex flex-row">
            <div>{props.col_name}</div>
            <div className="custom-css-005">
                <img
                    alt="up"
                    width="10px"
                    height="10px"
                    src="https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2Fup.png?alt=media&token=1e9f3c81-c00e-40fb-9be1-6b292d0582c6"
                    style={{
                        opacity:
                            props.asc &&
                            props.select_field === props.col_name
                                ? 1
                                : 0.3,
                    }}
                />
                <img
                    alt="down"
                    width="10px"
                    height="10px"
                    src="https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2Fdown.png?alt=media&token=1e9f3c81-c00e-40fb-9be1-6b292d0582c6"
                    style={{
                        opacity:
                            !props.asc &&
                            props.select_field === props.col_name
                                ? 1
                                : 0.3,
                    }}
                />
            </div>
        </div>
    );
}

export default UpDownButton;
