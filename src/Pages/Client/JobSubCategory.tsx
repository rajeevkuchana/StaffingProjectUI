import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchJobCategory, fetchJobDescription, reset, } from '../../Redux/profileSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NoDataFound from '../../Components/NoDataFound'
import CreatableSelect from 'react-select/creatable'
import { Dialog } from 'primereact/dialog'
import e from 'express'
import { Button } from 'primereact/button'

const JobSubCategory: React.FC = (data: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobCategory } = useParams<{ jobCategory: string }>()
  const { jobProfileSub } = useParams<{ jobProfileSub: string }>()
  const jobCategoryList = useSelector((state: RootState) => state.profile.jobCategory);
  const searchProfilesJobDesc = useSelector((state: RootState) => state.profile.searchProfilesJobDesc);  
  const [jobSubCategor, setJobSubCategor] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [subCategoryDisplay, setSubCategoryDisplay] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const _jobSubCategor = jobCategoryList.find(x => x.id === jobProfileSub);
    setJobSubCategor({ ..._jobSubCategor || {} });
  }, [])

  const updateProfile = (event: any) => {
    navigate(`/client/profile/${jobCategory}/${jobProfileSub}/${event.value}/result-list`)
  }

  const showJobDescription = (data) => {
    setSubCategoryDisplay(data.subCategoryDisplay);
    dispatch(fetchJobDescription(
      {
        jobCategory : jobCategory,
        subCategoryCode :data.subCategoryCode
      }
    ))
    setVisible(true)
  }


  return (
    <><div className='row'>
      <div className='col-12'>
        <CreatableSelect onChange={updateProfile} placeholder="Enter profile..." />
      </div>
    </div><div className="row">
        {jobSubCategor?.id && jobSubCategor?.jobProfilesSubCats?.map((item: any) => {
          return (
            <div className="col-sm-3 pb-5 position-relative col-md-3 mb-4">
              <Link className='job-sub-category' to={`/client/profile/${jobCategory}/${jobProfileSub}/${item.subCategoryCode}/result-list`}>
                <div className="box">
                  <div className="our-services job-sub-category">
                    <div className="icon">
                      <img src="https://i.imgur.com/6NKPrhO.png" />
                    </div>
                    <h4>{item.subCategoryDisplay}</h4>
                    <p className='our-desc-sc'>{item.subCategoryDesc}</p>

                  </div>
                </div>
              </Link>

              <Button onClick={(e) => { showJobDescription(item) }} className='job-desc' label="Job Description" severity="secondary" text />

            </div>
          )
        })}
        {!jobSubCategor?.jobProfilesSubCats && (
          <><NoDataFound actionText={'Back'} actionUrl={`/client/profile/${jobCategory}`}></NoDataFound></>
        )}
      </div>
      <Dialog maximizable header={''} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
        <div  className="mb-5" dangerouslySetInnerHTML={{ __html: searchProfilesJobDesc?.jobDescriptionText }} />
      </Dialog>

    </>
  )
}

export default JobSubCategory