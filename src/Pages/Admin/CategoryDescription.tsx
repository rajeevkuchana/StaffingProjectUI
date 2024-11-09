import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../App/Store";
import { createJobDescription, fetchJobCategory, fetchJobDescription } from "../../Redux/profileSlice";
import { uuidv4 } from "../../Utils/Utils";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";

const CategoryDescription = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [jobCategory, setJobCategory] = useState('fulltime');
    const [jobCategoryData, setJobCategoryData] = useState<any>();
    const [jobSubCategoryData, setJobSubCategoryData] = useState<any>();
    const [selectedJobSubCategoryData, setSelectedJobSubCategoryData] = useState<any>();

    const [text, setText] = useState('');
    const jobCategories = useSelector((state: RootState) => state.profile.jobCategories);
    const status = useSelector((state: RootState) => state.user.status);
    const searchProfilesJobDesc = useSelector((state: RootState) => state.profile.searchProfilesJobDesc);


    useEffect(() => {
        if (searchProfilesJobDesc?.jobDescriptionText?.length) {
            setText(searchProfilesJobDesc?.jobDescriptionText)
        }
    }, [searchProfilesJobDesc])

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchJobCategory(jobCategory || ''));
        }
    }, [status, dispatch,]);

    useEffect(() => {
        dispatch(fetchJobCategory(jobCategory || ''));
    }, [jobCategory]);

    useEffect(() => {
        if (jobCategories.length) {
            setJobCategoryData(jobCategories[0].categoryCode)
        }
    }, [jobCategories]);

    useEffect(() => {
        if (jobCategories.length) {
            setJobSubCategoryData(jobCategories.find(x => x.categoryCode === jobCategoryData))
            setSelectedJobSubCategoryData(jobCategories.find(x => x.categoryCode === jobCategoryData)?.jobProfilesSubCats[0]?.subCategoryCode || '')

        }
    }, [jobCategoryData]);

    const createDescription = () => {
        const desc = {
            "jobCategoryCode": selectedJobSubCategoryData,
            "jobCategory": jobCategory,
            "jobDescriptionText": text
        }
        dispatch(createJobDescription(desc))
    }

    const getDescription = () => {
        dispatch(fetchJobDescription(
            {
                "subCategoryCode": selectedJobSubCategoryData,
                "jobCategory": jobCategory,
            }
        ))
    }

    return (
        <>
            <div className='row gy-3 gy-md-4 my-2'>
                <div className="col-3 from-row">
                    <select value={jobCategory} name="jobCategory" onChange={(e: any) => { setJobCategory(e.target.value) }} className="form-control" aria-label="Default select example">
                        <option value={'fulltime'}>Full-Time</option>
                        <option value={'parttime'}>Part-Time</option>
                        <option value={'c2h'}>Contract/C2H</option>
                        <option value={'premium'}>Premium</option>
                        <option value={'executive'}>Executive</option>
                    </select>                </div>
                <div className="col-4 from-row">
                    <select value={jobCategoryData} name="jobCategory" onChange={(e: any) => { setJobCategoryData(e.target.value) }} className="form-control" aria-label="Default select example">
                        {
                            jobCategories && jobCategories.map(x => {
                                return (
                                    <option key={uuidv4()} value={x.categoryCode}>{x.categoryDisplay}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="col-4 from-row">
                    <select value={selectedJobSubCategoryData} name="jobCategory" onChange={(e: any) => { setSelectedJobSubCategoryData(e.target.value) }} className="form-control" aria-label="Default select example">
                        {
                            jobSubCategoryData && jobSubCategoryData.jobProfilesSubCats.map(x => {
                                return (
                                    <option key={uuidv4()} value={x.subCategoryCode}>{x.subCategoryDisplay}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-1 from-row">
                    <Button size="small" onClick={ getDescription} icon="pi pi-search"></Button>
                </div>
            </div>
            <div className="row ">
                <Editor value={searchProfilesJobDesc?.jobDescriptionText} onTextChange={(e: any) => setText(e.htmlValue)} style={{ height: '320px' }} />
                <div className='text-end mt-2'>
                    <Button onClick={createDescription} >Save</Button>
                </div>
            </div>
        </>
    )
}
export default CategoryDescription;
