import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchJobCategory, reset, } from '../../Redux/profileSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NoDataFound from '../../Components/NoDataFound'
import CreatableSelect from 'react-select/creatable'

const JobSubCategory: React.FC = (data: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobCategory } = useParams<{ jobCategory: string }>()
  const { jobProfileSub } = useParams<{ jobProfileSub: string }>()
  const jobCategoryList = useSelector((state: RootState) => state.profile.jobCategory);
  const [jobSubCategor, setJobSubCategor] = useState<any>();
  let navigate = useNavigate();

  useEffect(() => {
    const _jobSubCategor = jobCategoryList.find(x => x.id === jobProfileSub);
    setJobSubCategor({ ..._jobSubCategor || {} });
  }, [])

  const updateProfile = (event: any) => {
    navigate(`/client/profile/${jobCategory}/${jobProfileSub}/${event.value}/result-list`)
  }

  return (
    <><div className='row'>
      <div className='col-12'>
        <CreatableSelect onChange={updateProfile} placeholder="Enter profile..." />
      </div>
    </div><div className="row">
        {jobSubCategor?.id && jobSubCategor?.jobProfilesSubCats?.map((item: any) => {
          return (
            <div className="col-sm-3 col-md-3 mb-4">
              <Link className='job-sub-category' to={`/client/profile/${jobCategory}/${jobProfileSub}/${item.subCategoryCode}/result-list`}>
                <div className="box">
                  <div className="our-services job-sub-category">
                    <div className="icon">
                      <img src="https://i.imgur.com/6NKPrhO.png" />
                    </div>
                    <h4>{item.subCategoryDisplay}</h4>
                    <p>{item.subCategoryDesc}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
        {!jobSubCategor?.jobProfilesSubCats && (
          <><NoDataFound actionText={'Back'} actionUrl={`/client/profile/${jobCategory}`}></NoDataFound></>
        )}
      </div></>
  )
}

export default JobSubCategory