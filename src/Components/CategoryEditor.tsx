
import { useEffect, useState } from 'react';
import { Editor } from 'primereact/editor';
import { createJobDescription, fetchJobDescription } from '../Redux/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../App/Store';
import { Button } from 'primereact/button';

const CategoryEditor = (props) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const searchProfilesJobDesc = useSelector((state: RootState) => state.profile.searchProfilesJobDesc);

    useEffect(() => {
        dispatch(fetchJobDescription(
            {
                jobCategory: props.jobCategory,
                subCategoryCode: props.jobCategoryCode
            }
        ))
    }, [])

    useEffect(() => {
        if (searchProfilesJobDesc?.jobDescriptionText?.length) {
            setText(searchProfilesJobDesc?.jobDescriptionText)
        }
    }, [searchProfilesJobDesc])

    const createDescription = () => {
        const desc = {
            "jobCategoryCode": props.jobCategoryCode,
            "jobCategory": props.jobCategory,
            "jobDescriptionText": text
        }
        dispatch(createJobDescription(desc))
    }

    return (
        <>
            <Editor value={searchProfilesJobDesc?.jobDescriptionText} onTextChange={(e: any) => setText(e.htmlValue)} style={{ height: '320px' }} />
            <div className='text-end mt-2'>
                <Button onClick={createDescription}>Save</Button>
            </div>
        </>
    );
}
export default CategoryEditor

