import React from "react";

class Page extends React.Component {

    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>

        );
    }
}


Page.propTypes = {};

export default Page;
