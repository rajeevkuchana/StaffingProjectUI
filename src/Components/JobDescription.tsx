

export default function JobDescription(props :any) {
    return (
        <div className="card p-5 JobDescription">
            <div dangerouslySetInnerHTML={{ __html: props.data }} />
        </div>
    );
}
