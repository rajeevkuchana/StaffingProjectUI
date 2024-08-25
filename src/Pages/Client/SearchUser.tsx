import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchSearchProfileById, selectProfile } from '../../Redux/profileSlice'
import './SearchUser.css'
import { TabPanel, TabView } from 'primereact/tabview'
import { Rating } from 'primereact/rating'
import { Panel } from 'primereact/panel'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Skeleton } from 'primereact/skeleton'
import userImage from './../../Images/userupload.png'
import { Button } from 'primereact/button'

const SearchUser: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>();
  const searchProfile = useSelector((state: RootState) => state.profile.searchProfile);
  const isProfileSelected = useSelector((state: RootState) => state.profile.isProfileSelected);
  const status = useSelector((state: RootState) => state.profile.searchProfileStatus);
  const error = useSelector((state: RootState) => state.profile.error);
  const items = [{ label: 'Search', url: '/client/search' }, { label: 'Profile' }];
  const home = { icon: 'pi pi-home', url: '/home' }
  let navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSearchProfileById(id || ''));
    }
  }, [status, dispatch]);

  const openResume = () => {
    const w = window.open(searchProfile.resumeLink, '_blank');
    if (w) {
      w.focus(); // okay now
    }
  }

   const selectUserProfile = () => {
    dispatch(selectProfile(id))
  }

  useEffect(() => {
    if (isProfileSelected) {
      navigate('/recruiter/profile');
    }
  }, [isProfileSelected])

  return (
    <>

      {status === "loading" && (
        <div className="border-round border-1 surface-border  surface-card">
          <div className="flex mb-3">
            <Skeleton shape="circle" size="10rem" className="mr-2"></Skeleton>
            <div>
              <Skeleton width="40rem" className="mb-2"></Skeleton>
              <Skeleton width="40rem" className="mb-2"></Skeleton>
              <Skeleton height="5rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="100%" height="150px"></Skeleton>
          <div className="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
        </div>
      )}
      {
        status === "succeeded" && (

          <section className="bg-light">
            <div className="container">
              <div className="row main-profile">
                <div className='col-md-3 card border-2'>
                  <div className=' '>
                    <div className="">
                      <img className='profile-image ' src={searchProfile.profilePic ? searchProfile.profilePic : userImage} alt="..." />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 'bold', color: '#2c5073' }}>
                      BASIC DETAILS
                      <hr></hr>
                    </div>
                    <div className='text-left'>
                      <div className='row'>
                        <ul style={{ fontSize: 14 }} className="">

                          <li style={{ fontSize: 16, fontWeight: 'bold', color: '#0f34ba' }} className="list-group-item ">First Name
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {searchProfile.firstName}</li>
                          <li style={{ fontSize: 16, fontWeight: 'bold', color: '#0f34ba' }} className="list-group-item ">Last Name
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {searchProfile.lastName}</li>
                          <li className="list-group-item ">Gender &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {searchProfile.gender}</li>
                          <li className="list-group-item ">Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {searchProfile.location}</li>
                          <li className="list-group-item ">Phone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {searchProfile.phone}</li>
                          <li className="list-group-item ">Company &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{searchProfile.currentCompany}</li>
                          <li className="list-group-item ">Designation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {searchProfile.designation}</li>
                          <li className="list-group-item fs-10">Total Experience &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {searchProfile.overallExp} Years</li>
                          <li className="list-group-item fs-10">Relevant Experience &nbsp;&nbsp;&nbsp;&nbsp;
                            {searchProfile.relevantExp} Years</li>

                          <li className="list-group-item fs-10">Current CTC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{searchProfile.currentCTC} LPA</li>
                          <li className="list-group-item fs-10">Expected CTC &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {searchProfile.expectedCTC} LPA</li>
                          <li className="list-group-item fs-10">Notice Period &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {searchProfile.noticePeriod} </li>
                        </ul>
                      </div>

                    </div>
                    <br></br>
                    <div style={{ fontSize: 16, fontWeight: 'bold', color: '#2c5073' }}>
                      PROFESSIONAL RATING
                      <hr></hr>
                    </div>
                    <div className="mt-4 mb-lg-0 rating">
                      <div className='d-flex justify-content-between gap-5'>
                        <div><small>Programming</small>  </div>
                        <div> <Rating value={searchProfile.programmingR} readOnly cancel={false} /></div>

                      </div>
                      <div className='d-flex justify-content-between gap-4'>
                        <div>  <small>Data Engineer</small> </div>
                        <div> <Rating value={searchProfile.dataEngR} readOnly cancel={false} /></div>

                      </div>
                      <div className='d-flex justify-content-between gap-4  '>
                        <div>  <small>Cloud</small> </div>
                        <div> <Rating value={searchProfile.cloudEngR} readOnly cancel={false} /></div>

                      </div>
                      <div className='d-flex justify-content-between  gap-4 '>
                        <div><small>Communication</small> </div>
                        <div> <Rating value={searchProfile.communicationR} readOnly cancel={false} /></div>

                      </div>
                      <div className='d-flex justify-content-between gap-4 mb-2'>
                        <div> <small>Attitude</small> </div>
                        <div> <Rating value={searchProfile.attitudeR} readOnly cancel={false} /></div>

                      </div>

                      <div className='d-flex justify-content-between gap-2  mb-2'>
                        <div style={{ fontSize: 15, fontWeight: 'bold' }} > Over All Rating </div>
                        <div >
                          <Rating value={searchProfile.overAllRating} readOnly cancel={false} /></div>
                      </div>
                      <br></br>
                      <div className='d-flex justify-content-between gap-2  '>
                        <div >Recruiter </div>
                        <div >
                          {searchProfile.managedBy}
                        </div>
                      </div>
                      <div className='d-flex justify-content-between gap-2  mb-2'>
                        <div > Interviewer</div>
                        <div >
                          {searchProfile.interviewBy}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-9 card  border-0'>
                  <div style={{ fontSize: 20, fontWeight: 'bold', color: '#2c5073', textAlign: 'center' }}>PROFILE DESCRIPTION</div>
                  <div className=' '>
                    <TabView>
                      <TabPanel header="Summary" leftIcon="pi pi-server mr-2">
                        <div className='row'>
                          <div className='col-12'>
                            <p style={{ fontSize: 15 }} > <div style={{ fontSize: 17, fontWeight: 'bold', color: '##32619c' }}>Skills:
                            </div>  {searchProfile?.summary?.skills?.toString()}</p>
                            <p style={{ fontSize: 15 }} > <div style={{ fontSize: 17, fontWeight: 'bold', color: '##32619c' }}>Certification:
                            </div>  {searchProfile.certificationList?.toString()}</p>

                            <p style={{ fontSize: 15 }}> <div style={{ fontSize: 17, fontWeight: 'bold', color: '##32619c' }}>Summary:
                            </div>  {searchProfile.summary?.summary1}</p>
                            <p style={{ fontSize: 15 }}> {searchProfile.summary?.summary2}</p>
                            <p style={{ fontSize: 15 }}> {searchProfile.summary?.summary3}</p>

                            <p style={{ fontSize: 15 }}> <div style={{ fontSize: 17, fontWeight: 'bold', color: '##32619c' }}>Experience:
                            </div>  {searchProfile.experienceDetails?.expD1}</p>
                            <p style={{ fontSize: 15 }}> {searchProfile.experienceDetails?.expD1}</p>
                            <p style={{ fontSize: 15 }}> {searchProfile.experienceDetails?.expD1}</p>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel header="Feedback" leftIcon="pi pi-comment mr-2" >
                        <div className='row'>
                          <div className='col-12'>

                            <p style={{ fontSize: 15 }}> <div style={{ fontSize: 17, fontWeight: 'bold', color: '##32619c' }}> Feedback:
                            </div>  {searchProfile?.feedback?.shortFeedback}</p>

                            <p style={{ fontSize: 15 }}> <div style={{ fontSize: 17, fontWeight: 'bold', color: '##32619c' }}> Interview Video:
                            </div>   <video width="100%" controls >
                                <source src={searchProfile.videoLink} type="video/mp4" />
                              </video></p>
                          </div>
                        </div>
                      </TabPanel>

                    </TabView>
                    {/* {
                      !searchProfile.selectedBy && (
                        <Button label="Shortlist" onClick={selectUserProfile} className='shortlist' size='small' />
                      )
                    } */}
                  </div>
                </div>
              </div>
            </div>
          </section >
        )
      }
    </>
  )
}

export default SearchUser
