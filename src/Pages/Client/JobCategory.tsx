import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchJobCategory, reset, } from '../../Redux/profileSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'

const JobCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobCategory } = useParams<{ jobCategory: string }>()
  const jobCategorys = useSelector((state: RootState) => state.profile.jobCategory);
  const status = useSelector((state: RootState) => state.profile.jobCategoryStatus);
  let navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobCategory(jobCategory || ''));
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchJobCategory(jobCategory || ''));
  }, [jobCategory]);

  useEffect(() => {
    return () => {
      dispatch(reset())
    };
  }, []);

  const updateProfile = (event: any) => {
    navigate(`/client/profile/${jobCategory}/1/${event.value}/result-list`)
  }

  return (
    <><div className='row'>
      <div className='col-12'>
        <CreatableSelect onChange={updateProfile}  placeholder="Enter profile..." />
      </div>
    </div>
      <div className="row">
        {jobCategorys && jobCategorys.map(item => {
          return (
            <div className="col-sm-3 col-md-3 mb-4">
              <Link className='job-category' to={`/client/profile/${jobCategory}/${item.id}`}>
                <div className="box">
                  <div className="our-services job-category">
                    <div className="icon">
                      <img src={`${item.categoryIcon || 'https://i.imgur.com/6NKPrhO.png'}`} />
                    </div>
                    <h4>{item.categoryDisplay}</h4>
                    <p>{item.categoryDescriptions || 'Job category descriptions'}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div></>
  )
}

export default JobCategory
