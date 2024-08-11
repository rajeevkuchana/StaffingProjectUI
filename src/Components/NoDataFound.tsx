import './NoDataFound.css'
const NoDataFound = (props: any) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>
                            {props.message || 'Not Found'}</h2>
                        <div className="error-details">
                            {props.message || 'Sorry, an error has occured, Requested page not found!'}
                        </div>
                        <div className="error-actions">
                            <a href={props.actionUrl || '/home'} className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                                {props.actionText || 'Home'}   </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default NoDataFound;
