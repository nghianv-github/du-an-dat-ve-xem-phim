import React from "react";
import "./style.scss";

const Genres = ({ data }) => {
    return (
        <div className="genres">
            {
                data?.sort(() => 0.5 - Math.random()).slice(0, 2)?.map((name, index) => {
                    return (
                        <div key={index} className="genre">
                            {name}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Genres;
